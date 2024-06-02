import {FC, ReactNode} from "react";
import {Sidebar} from "./sidebar";
import {Container} from "./Container.tsx";
import {Header} from "./header";

export const Layout: FC<{ children: ReactNode }> = ({children}) => {

  return (
    <div className="drawer lg:drawer-open">
      <input id="main-sidebar" type="checkbox" className="drawer-toggle"/>
      <div className="drawer-content">
        <Header/>
        <Container>
          {children}
        </Container>
      </div>
      <div className="drawer-side">
        <Sidebar/>
      </div>
    </div>
  );
}