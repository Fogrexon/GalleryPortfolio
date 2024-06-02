import {FC, ReactNode, useCallback, useState} from "react";
import {Sidebar} from "./sidebar";
import {Container} from "./Container.tsx";
import {Header} from "./header";

export const Layout: FC<{ children: ReactNode }> = ({children}) => {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = useCallback(() => setSidebarOpen(sidebarOpen => !sidebarOpen), [setSidebarOpen]);

  return (
    <div className="w-screen">
      <Sidebar open={sidebarOpen} toggleOpen={toggleSidebar}/>
      <div className="ml-0 md:ml-64">
        <Header toggleOpen={toggleSidebar}/>
        <Container>
          {children}
        </Container>
      </div>
    </div>
  );
}