import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Layout} from "./components/Layout.tsx";
import {Home} from "./pages/home";
import {About} from "./pages/about";

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/about" Component={About}/>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
