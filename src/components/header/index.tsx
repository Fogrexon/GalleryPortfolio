import {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

type HeaderProps = {
  title?: string
}

export const Header: FC<HeaderProps> = ({title = "Fogrex's Page"}) => {
  return (
    <nav className="navbar bg-base-100 shadow">
      <div className="flex-none block">
        <label htmlFor="main-sidebar" className="btn btn-square btn-ghost drawer-button lg:hidden">
          <FontAwesomeIcon icon={faBars}/>
        </label>
      </div>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">{title}</Link>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               className="inline-block w-5 h-5 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
          </svg>
        </button>
      </div>
    </nav>
  )
}