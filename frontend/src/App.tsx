import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Registro from "./pages/Registro/Registro";
import Login from "./pages/Login/Login";
import HomePage from "./pages/Home Page/HomePage";
import PseudoAPI from "./pages/PseudoAPI/PseudoAPI";
import Busqueda from "./pages/Busqueda/Busqueda";
import Estadisticas from "./pages/Estadísticas/Estadisticas";
import VisualizarFactura from "./pages/VisualizarFactura/VisualizarFactura";
import RegistrarModelo from "./pages/RegistrarModelos/RegistrarModelo";
import RegistrarVehiculo from "./pages/RegistrarVehiculo/RegistrarVehiculo";
import RegistrarProveedor from "./pages/RegistrarProveedores/RegistrarProveedores";
import RegistrarOrdenCompra from "./pages/RegistrarOrden_Compra/RegistrarOrdenCompra";
import RegistrarPlan from "./pages/RegistrarPlan/RegistrarPlan";
import RegistrarActividad from "./pages/RegistrarActividad/RegistrarActividad";
import RegistrarServicio from "./pages/RegistrarServicio/RegistrarServicio";
import RegistrarFamilia from "./pages/RegistrarFamilia/RegistrarFamilia";
import RegistrarMarca from "./pages/RegistrarMarca/RegistrarMarca";
import RegistrarOrdenServicio from "./pages/RegistrarOrden_Servicio/RegistrarOrdenServicio";
import RegistrarProducto from "./pages/RegistrarProducto/RegistrarProducto";

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
      <Route path="/RegistrarProveedor" element={<RegistrarProveedor/>}></Route>
      <Route path="/RegistrarOrdenCompra" element={<RegistrarOrdenCompra/>}></Route>
      <Route path="/RegistrarPlan" element={<RegistrarPlan/>}></Route>
      <Route path = "/RegistrarActividad" element={<RegistrarActividad/>}></Route>
      <Route path = "/RegistrarServicio" element={<RegistrarServicio/>}></Route>
      <Route path = "/RegistrarFamilia" element={<RegistrarFamilia/>}></Route>
      <Route path = "/RegistrarMarca" element={<RegistrarMarca/>}></Route>
      <Route path="/RegistrarOrdenServicio" element={<RegistrarOrdenServicio/>}></Route>
      <Route path="/RegistrarProducto" element={<RegistrarProducto/>}></Route>
    </Routes>             
  </Router>
)

export default App;                     