const MAPDATA_URL = "mapDownloader/mapData/z0/";
const map = document.getElementById("map");

class Region {
  position = { x: 0, y: 0 };
  constructor(src) {
    this.element = document.createElement("img");
    this.element.setAttribute("draggable", "false");
    this.element.setAttribute("width", "256");
    this.element.setAttribute("height", "256");
    this.element.setAttribute("class", "region");
    this.element.setAttribute("src", src);
    this.src = src;
  }

  updatePostion(dx, dy) {
    this.position = { x: this.position.x + dx, y: this.position.y + dy };
    this.element.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    console.log(dx);
  }
}

r = new Region(MAPDATA_URL + "map-0-0-0.jpg");
map.appendChild(r.element);

let mousePos = { x: 0, y: 0 };
let mouseIsDown = false;
window.addEventListener("mousemove", (event) => {
  if (mouseIsDown) {
    const deltaMove = { dx: event.clientX - mousePos.x, dy: event.clientY - mousePos.y };
    r.updatePostion(deltaMove.dx, deltaMove.dy);
  }
  mousePos = { x: event.clientX, y: event.clientY };
});

window.addEventListener("wheel", (event) => {
  console.log(event.deltaY);
});

map.addEventListener("mousedown", (event) => {
  //   console.log("down");
  mouseIsDown = true;
});

map.addEventListener("mouseup", (event) => {
  // console.log("up");
  mouseIsDown = false;
});

const interval = setInterval(() => {}, 100);
