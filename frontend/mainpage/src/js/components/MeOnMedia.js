import { BsTelegram, BsGithub, BsYoutube, BsTwitter } from "react-icons/bs";
import { SiItchdotio, SiPatreon } from "react-icons/si";

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
      link: "https://patreon.com/NickPhilomath",
      name: "patreon",
      component: SiPatreon,
    },
    {
      link: "https://t.me/nickphilomath",
      name: "telegram",
      component: BsTelegram,
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
  ];

  return (
    <div className="MeOnMedia">
      <h1>Find me everywhere</h1>
      <div className="logos w-50 row row-cols-lg-6 row-cols-sm-3 g-3">
        {urls.map((url) => {
          return (
            <a href={url.link} className={"col logo " + url.name} target="blank">
              <url.component />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MeOnMedia;
