function getBase64Image(img) {
  // Create an empty canvas element
  var canvas = document.createElement("canvas");
  img.crossOrigin = "Anonymous";
  canvas.width = img.width;
  canvas.height = img.height;

  // Copy the image contents to the canvas
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  // console.log(ctx.getImageData(0, 0, 256, 256));

  // Get the data-URL formatted image
  // Firefox supports PNG and JPEG. You could check img.src to
  // guess the original format, but be aware the using "image/jpg"
  // will re-encode the image.
  var dataURL = canvas.toDataURL("image/jfif").replace("data:image/png;base64,", "");
  // dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  // dataURL.replace("data:image/png;base64,", "");
  return dataURL;
}

const postData = async (regionIndex, img_data) => {
  const rawResponse = await fetch(MAPDATA_URL + `?x=${regionIndex.x}&y=${regionIndex.y}&z=${regionIndex.z}`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: "test",
    },
    body: JSON.stringify({ data: img_data }),
  });
  const content = await rawResponse.json();
  console.log(content);
};

const MAPDATA_URL = "/api/mapdata";
const GOOGLE_MAPDATA_URL = "https://khms0.googleapis.com/kh?v=947&hl=en-US&";
const REMOVE_PADDING = 300;

const map = document.getElementById("map");

let zoomLevel = 0;
let mousePos = { x: 0, y: 0 };
let mouseIsDown = false;
const regions = [];

class Region {
  position = { x: 0, y: 0 };
  regionIndex = { x: 0, y: 0, z: 0 };
  width = 256;
  height = 256;
  error = false;
  googleData = false;
  constructor(rx, ry, rz, useCache = true) {
    let url = "";
    if (useCache) {
      url = MAPDATA_URL + `?x=${rx}&y=${ry}&z=${rz}`;
    } else {
      url = GOOGLE_MAPDATA_URL + `x=${rx}&y=${ry}&z=${rz}`;
    }
    this.regionIndex = { x: rx, y: ry, z: rz };
    this.element = document.createElement("img");
    this.element.setAttribute("draggable", "false");
    this.element.setAttribute("width", this.width);
    this.element.setAttribute("height", this.height);
    let className = useCache ? "region" : "region uncached";
    this.element.setAttribute("class", className);
    this.element.setAttribute("src", url);
  }

  updatePostionDelta(dx, dy) {
    this.position = { x: this.position.x + dx, y: this.position.y + dy };
    this.element.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
  }
  updatePosition(x, y) {
    this.position = { x: x, y: y };
    this.element.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
  }
  scale(s) {
    this.width = this.width * s;
    this.height = this.height * s;
    this.element.setAttribute("width", this.width);
    this.element.setAttribute("height", this.height);
  }
}

const getInnerIndex = (i) => {
  return i * 2;
};

const updateQuality = () => {
  for (let i = 0; i < regions.length; i++) {
    if (regions[i].width === 512) {
      let pos = regions[i].position;
      let regionIndex = regions[i].regionIndex;
      map.removeChild(regions[i].element);
      regions.splice(i, 1);
      // add new subregions
      for (let j = 0; j < 2; j++) {
        for (let k = 0; k < 2; k++) {
          let region = new Region(regionIndex.x * 2 + j, regionIndex.y * 2 + k, regionIndex.z + 1);
          region.updatePosition(pos.x + 256 * j, pos.y + 256 * k);
          region.element.addEventListener("error", (event) => {
            // map.removeChild(event.srcElement);
            region.error = true;
          });
          regions.push(region);
          map.appendChild(region.element);
        }
      }
    }
  }
};

const checkIfLoaded = () => {
  for (let i = 0; i < regions.length; i++) {
    if (regions[i].error) {
      let pos = regions[i].position;
      let regionIndex = regions[i].regionIndex;
      map.removeChild(regions[i].element);
      // get new one from google
      let region = new Region(regionIndex.x, regionIndex.y, regionIndex.z, false);
      region.updatePosition(pos.x, pos.y);
      region.element.addEventListener("load", (event) => {
        // map.removeChild(event.srcElement);
        region.googleData = true;
      });
      regions[i] = region;
      map.appendChild(region.element);
    }
  }
};

const checkGoogleLoadedData = () => {
  for (let i = 0; i < regions.length; i++) {
    if (regions[i].googleData) {
      regions[i].googleData = false;
      if (regions[i].element.width == 256) {
        let img_data = getBase64Image(regions[i].element);
        let regionIndex = regions[i].regionIndex;
        postData(regionIndex, img_data);
      }
    }
  }
};

const removeUnviewed = () => {
  for (let i = 0; i < regions.length; i++) {
    let position = regions[i].position;
    if (position.x < -REMOVE_PADDING || position.y < -REMOVE_PADDING || position.x > window.innerWidth + REMOVE_PADDING || position.y > window.innerHeight + REMOVE_PADDING) {
      map.removeChild(regions[i].element);
      regions.splice(i, 1);
    }
  }
};

r = new Region(0, 0, 0);
r.updatePosition(window.innerWidth / 2 - 128, window.innerHeight / 2 - 128);
r.element.addEventListener("error", (event) => {
  r.error = true;
});
regions.push(r);
map.appendChild(r.element);

window.addEventListener("mousemove", (event) => {
  if (mouseIsDown) {
    const deltaMove = { dx: event.clientX - mousePos.x, dy: event.clientY - mousePos.y };
    for (let i = 0; i < regions.length; i++) {
      regions[i].updatePostionDelta(deltaMove.dx, deltaMove.dy);
    }
  }
  mousePos = { x: event.clientX, y: event.clientY };
});

window.addEventListener("wheel", (event) => {
  zoom = event.deltaY < 0 ? 1 : event.deltaY > 0 ? -1 : 0;
  scale = zoom === -1 ? 0.5 : zoom === 1 ? 2 : 1;
  if (!zoom) return;

  for (let i = 0; i < regions.length; i++) {
    pos = { x: regions[i].position.x - mousePos.x, y: regions[i].position.y - mousePos.y }; // position from mouse POV
    newPos = { x: pos.x * scale, y: pos.y * scale };
    regions[i].updatePosition(mousePos.x + newPos.x, mousePos.y + newPos.y);
    regions[i].scale(scale);
  }
});

map.addEventListener("mousedown", (event) => {
  mouseIsDown = true;
});

map.addEventListener("mouseup", (event) => {
  mouseIsDown = false;
});

const interval = setInterval(() => {
  updateQuality();
  checkIfLoaded();
  checkGoogleLoadedData();
  removeUnviewed();
}, 100);
