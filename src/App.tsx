import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Layout} from "./components/Layout.tsx";
import {Home} from "./pages/home";
import {About} from "./pages/about";
import {Research} from "./pages/research";
import {Gallery} from "./pages/gallery";

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/about" Component={About}/>
          <Route path="/gallery" Component={Gallery}/>
          <Route path="/research" Component={Research}/>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
