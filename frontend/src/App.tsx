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
import ProtectedRoute from "./components/RutaProtegida/ProtectedRoute";
import RegistrarOrdenServicio from "./pages/RegistrarOrden_Servicio/RegistrarOrdenServicio";
import RegistrarProducto from "./pages/RegistrarProducto/RegistrarProducto";
import RegistrarEstablecimiento from "./pages/Registrar Establecimiento/RegistrarEstablecimiento";
import RegistrarEmpleado from "./pages/RegistrarEmpleado/RegistrarEmpleado";
import RegistrarCliente from "./pages/RegistrarCliente/RegistrarCliente";
import OrdenServicio from "./pages/OrdenServicio/OrdenServicio";
import Inventario from "./pages/Inventario/Inventario";
import RegistrarInventario from "./pages/RegistrarInventario/RegistrarInventario";
import SobreNosotros from "./pages/SobreNosotros/SobreNosotros";


// Importar páginas de detalle
import EmpleadoDetalle from "./pages/Detalle/EmpleadoDetalle";
import EstablecimientoDetalle from "./pages/Detalle/EstablecimientoDetalle";
import ClienteDetalle from "./pages/Detalle/ClienteDetalle";
import ProveedorDetalle from "./pages/Detalle/ProveedorDetalle";
import ProductoDetalle from "./pages/Detalle/ProductoDetalle";
import OrdenServicioDetalle from "./pages/Detalle/OrdenServicioDetalle";
import VehiculoDetalle from "./pages/Detalle/VehiculoDetalle";
import MarcaDetalle from "./pages/Detalle/MarcaDetalle";
import ModeloDetalle from "./pages/Detalle/ModeloDetalle";

const App = () => (

  <Router>
    <Routes>
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/Registro" element={<Registro/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
      <Route path="/HomePage" element={<ProtectedRoute><HomePage/></ProtectedRoute>}></Route>
      <Route path="/API" element={<ProtectedRoute><PseudoAPI/></ProtectedRoute>}></Route>
      <Route path="/Search" element={<ProtectedRoute><Busqueda/></ProtectedRoute>}></Route>                                                                      
      <Route path="/Inventario" element={<ProtectedRoute><Inventario/></ProtectedRoute>}></Route>
      <Route path="/RegistrarInventario" element={<ProtectedRoute><RegistrarInventario/></ProtectedRoute>}></Route>
      <Route path="/Stats" element={<ProtectedRoute><Estadisticas/></ProtectedRoute>}></Route>
      <Route path="/Factura" element={<ProtectedRoute><VisualizarFactura cod_OS={4}/></ProtectedRoute>}></Route>
      <Route path="/factura/:nro_factura" element={<ProtectedRoute><VisualizarFactura/></ProtectedRoute>}></Route>
      <Route path="/RegistrarModelo" element={<ProtectedRoute><RegistrarModelo/></ProtectedRoute>}></Route>
      <Route path="/RegistrarVehiculo" element={<ProtectedRoute><RegistrarVehiculo/></ProtectedRoute>}></Route>
      <Route path="/RegistrarProveedor" element={<ProtectedRoute><RegistrarProveedor/></ProtectedRoute>}></Route>
      <Route path="/RegistrarOrdenCompra" element={<ProtectedRoute><RegistrarOrdenCompra/></ProtectedRoute>}></Route>
      <Route path="/RegistrarPlan" element={<ProtectedRoute><RegistrarPlan/></ProtectedRoute>}></Route>
      <Route path="/RegistrarActividad" element={<ProtectedRoute><RegistrarActividad/></ProtectedRoute>}></Route>
      <Route path="/RegistrarServicio" element={<ProtectedRoute><RegistrarServicio/></ProtectedRoute>}></Route>
      <Route path="/RegistrarFamilia" element={<ProtectedRoute><RegistrarFamilia/></ProtectedRoute>}></Route>
      <Route path="/RegistrarMarca" element={<ProtectedRoute><RegistrarMarca/></ProtectedRoute>}></Route>
      <Route path="/RegistrarOrdenServicio" element={<ProtectedRoute><RegistrarOrdenServicio/></ProtectedRoute>}></Route>
      <Route path="/RegistrarProducto" element={<ProtectedRoute><RegistrarProducto/></ProtectedRoute>}></Route>
      <Route path="/RegistrarEstablecimiento" element={<ProtectedRoute><RegistrarEstablecimiento/></ProtectedRoute>}></Route>
      <Route path="/RegistrarEmpleado" element={<ProtectedRoute><RegistrarEmpleado/></ProtectedRoute>}></Route>
      <Route path="/RegistrarCliente" element={<ProtectedRoute><RegistrarCliente/></ProtectedRoute>}></Route>
      <Route path="/empleado-detalle" element={<ProtectedRoute><EmpleadoDetalle/></ProtectedRoute>}></Route>
      <Route path="/establecimiento-detalle" element={<ProtectedRoute><EstablecimientoDetalle/></ProtectedRoute>}></Route>
      <Route path="/cliente-detalle" element={<ProtectedRoute><ClienteDetalle/></ProtectedRoute>}></Route>
      <Route path="/proveedor-detalle" element={<ProtectedRoute><ProveedorDetalle/></ProtectedRoute>}></Route>
      <Route path="/producto-detalle" element={<ProtectedRoute><ProductoDetalle/></ProtectedRoute>}></Route>
      <Route path="/vehiculo-detalle" element={<ProtectedRoute><VehiculoDetalle/></ProtectedRoute>}></Route>
      <Route path="/marca-detalle" element={<ProtectedRoute><MarcaDetalle/></ProtectedRoute>}></Route>
      <Route path="/modelo-detalle" element={<ProtectedRoute><ModeloDetalle/></ProtectedRoute>}></Route>
      <Route path="/ordenes-servicio" element={<ProtectedRoute><OrdenServicio/></ProtectedRoute>}></Route>
      <Route path="/ordenservicio-detalle/:cod_OS" element={<ProtectedRoute><OrdenServicioDetalle/></ProtectedRoute>}></Route>
      <Route path="/AboutUs" element={<SobreNosotros/>}></Route>
    </Routes>             
  </Router>
)

export default App;                     