import {FC} from "react";
import {Link} from "react-router-dom";
import {faArrowUpRightFromSquare, faHouse, faImage, faInfoCircle,} from "@fortawesome/free-solid-svg-icons";
import {MenuItem} from "./MenuItem.tsx";
import {default as classNames} from "classnames";
import {faGithub, faXTwitter} from "@fortawesome/free-brands-svg-icons";

type SidebarProps = {
  open: boolean;
  toggleOpen: () => void;
}

export const Sidebar: FC<SidebarProps> = ({open, toggleOpen}) => {
  const sidebarClass = classNames("fixed w-64 bg-base-100 h-full z-10 grow-0 transition-all ease-out", {
    "-left-64": !open,
    "left-0": open
  }, "md:left-0")

  const modalBgClass = classNames("block md:hidden fixed w-screen h-screen bg-gray-900 left-0 top-0 z-0 transition", {
    "pointer-events-none": !open,
    "opacity-0": !open,
    "poitner-events-auto": open,
    "opacity-30": open,
  })

  return (
    <>
      <div className={modalBgClass} onClick={toggleOpen}/>
      <div className={sidebarClass}>
        <div className="navbar">
          <Link to={"/"}>Fogrex's Page</Link>
        </div>
        <ul className="menu mx-auto my-3 bg-base-200 w-56 rounded-box py-3">
          <li>
            <a>Pages</a>
            <ul>
              <li><Link to="/"><MenuItem faIcon={faHouse}>Home</MenuItem></Link></li>
              <li><Link to="/about"><MenuItem faIcon={faInfoCircle}>About</MenuItem></Link></li>
              <li><Link to="/about"><MenuItem faIcon={faImage}>Gallery</MenuItem></Link></li>
            </ul>
          </li>
          <li>
            <a>External Links</a>
            <ul>
              <li><Link to="/"><MenuItem faIcon={faXTwitter}>Twitter(X)</MenuItem></Link></li>
              <li><Link to="/about"><MenuItem faIcon={faGithub}>GitHub</MenuItem></Link></li>
              <li><Link to="/about"><MenuItem faIcon={faArrowUpRightFromSquare}>Blog</MenuItem></Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  )
}