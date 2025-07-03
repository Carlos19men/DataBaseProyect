import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Registro from "./pages/Registro/Registro";
import Login from "./pages/Login/Login";
import HomePage from "./pages/Home Page/HomePage";
import PseudoAPI from "./pages/PseudoAPI/PseudoAPI";
import Busqueda from "./pages/Busqueda/Busqueda";
import Estadisticas from "./pages/Estadísticas/Estadisticas";
import VisualizarFactura from "./pages/VisualizarFactura/VisualizarFactura";
import RegistrarModelo from "./pages/Registrar Modelos/RegistrarModelo";
import RegistrarVehiculo from "./pages/Registrar Vehiculo/RegistrarVehiculo";

const App = () => (


  
  <Router>
    <Routes>
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/Registro" element={<Registro/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
      <Route path="/HomePage" element={<HomePage/>}></Route>
      <Route path="/API" element={<PseudoAPI/>}>  </Route>
      <Route path="/Search" element={<Busqueda/>}></Route>
      <Route path="/Stats" element={<Estadisticas/>}></Route>
      <Route path="/Factura" element={<VisualizarFactura/>}></Route>
      <Route path="/RegistrarModelo" element={<RegistrarModelo/>}></Route>
      <Route path="/RegistrarVehiculo" element={<RegistrarVehiculo/>}></Route>
    </Routes>             
  </Router>
)

export default App;                     