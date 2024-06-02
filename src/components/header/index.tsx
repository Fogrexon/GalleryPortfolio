import {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {
  toggleOpen: () => void;
}

export const Header: FC<HeaderProps> = ({toggleOpen}) => {
  return (
    <nav className="navbar-center bg-base-100">
      <div className={"flex-none md:hidden"}>
        <button className="btn btn-square btn-ghost" onClick={toggleOpen}>
          <FontAwesomeIcon icon={faBars}/>
        </button>
      </div>
      <h1 className="flex-1">
        Fogrex's Website
      </h1>
      <div className="flex-none">
      </div>
    </nav>
  )
}