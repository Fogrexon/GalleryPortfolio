import {FC} from "react";
import {Link} from "react-router-dom";
import {faArrowUpRightFromSquare, faBook, faHouse, faImage, faInfoCircle,} from "@fortawesome/free-solid-svg-icons";
import {MenuItem} from "./MenuItem.tsx";
import {faGithub, faXTwitter} from "@fortawesome/free-brands-svg-icons";

export const Sidebar: FC = () => {

  return (
    <>
      <label htmlFor="main-sidebar" aria-label="close siderbar" className="drawer-overlay"></label>
      <div className="h-full bg-base-200">
        <div className="navbar">
          Fogrex's Page
        </div>
        <ul className="menu my-3 bg-base-200 w-56 py-3">
          <li>
            <a>Pages</a>
            <ul>
              <li><Link to="/"><MenuItem faIcon={faHouse}>Home</MenuItem></Link></li>
              <li><Link to="/about"><MenuItem faIcon={faInfoCircle}>About</MenuItem></Link></li>
              <li><Link to="/gallery"><MenuItem faIcon={faImage}>Gallery</MenuItem></Link></li>
              <li><Link to="/research"><MenuItem faIcon={faBook}>Research</MenuItem></Link></li>
            </ul>
          </li>
          <li>
            <a>External Links</a>
            <ul>
              <li><Link to="https://x.com/home" target="_blank"><MenuItem
                faIcon={faXTwitter}>Twitter(X)</MenuItem></Link></li>
              <li><Link to="https://github.com/Fogrexon/" target="_blank"><MenuItem faIcon={faGithub}>GitHub</MenuItem></Link>
              </li>
              <li><Link to="https://fogrexon.notion.site/" target="_blank"><MenuItem
                faIcon={faArrowUpRightFromSquare}>Blog</MenuItem></Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  )
}