import { BsTelegram, BsGithub, BsYoutube, BsTwitter } from "react-icons/bs";
import { SiItchdotio, SiPatreon } from "react-icons/si";

import { Link } from "react-router-dom";

const MeOnMedia = () => {
  const urls = [
    {
      link: "https://youtube.com/@NickPhilomath",
      name: "youtube",
      component: BsYoutube,
    },
    {
      link: "https://github.com/NickPhilomath",
      name: "github",
      component: BsGithub,
    },
    {
      link: "https://nickphilomath.itch.io",
      name: "itch",
      component: SiItchdotio,
    },
    {
      link: "https://twitter.com/NickPhilomath",
      name: "twitter",
      component: BsTwitter,
    },
    {
      link: "https://t.me/nickphilomath",
      name: "telegram",
      component: BsTelegram,
    },
    {
      link: "https://patreon.com/NickPhilomath",
      name: "patreon",
      component: SiPatreon,
    },
  ];

  return (
    <div className="MeOnMedia">
      <h1>Find me everywhere</h1>
      <div className="logos">
        {urls.map((url) => {
          return (
            <Link to={url.link} className={"logo " + url.name} target="blank">
              <url.component />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MeOnMedia;
