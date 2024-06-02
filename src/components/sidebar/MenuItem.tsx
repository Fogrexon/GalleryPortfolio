import {IconLookup} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FC, ReactNode} from "react";

type MenuItemProps = {
  faIcon: IconLookup
  children: ReactNode
}

export const MenuItem: FC<MenuItemProps> = ({faIcon, children}) => {
  return (
    <>
      <FontAwesomeIcon className="h-4 w-4" icon={faIcon}/>
      {children}
    </>
  )
}