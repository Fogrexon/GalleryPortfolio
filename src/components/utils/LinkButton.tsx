import {FC, ReactNode} from "react";
import {Link} from "react-router-dom";

type LinkButtonProps = {
  to: string;
  children?: ReactNode;
}

export const LinkButton: FC<LinkButtonProps> = ({to, children}) => (
  <Link to={to}>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {children}
    </button>
  </Link>
);
