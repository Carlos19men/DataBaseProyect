import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing/Landing";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Landing/>}></Route>
    </Routes>
  </Router>
)

export default App;