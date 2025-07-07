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
// import ProtectedRoute from "./components/RutaProtegida/ProtectedRoute";  // Temporarily commented out
import RegistrarOrdenServicio from "./pages/RegistrarOrden_Servicio/RegistrarOrdenServicio";
import RegistrarProducto from "./pages/RegistrarProducto/RegistrarProducto";
import RegistrarEstablecimiento from "./pages/Registrar Establecimiento/RegistrarEstablecimiento";
import RegistrarEmpleado from "./pages/RegistrarEmpleado/RegistrarEmpleado";
import RegistrarCliente from "./pages/RegistrarCliente/RegistrarCliente";
import OrdenServicio from "./pages/OrdenServicio/OrdenServicio";
import Inventario from "./pages/Inventario/Inventario";
import RegistrarInventario from "./pages/RegistrarInventario/RegistrarInventario";
import SobreNosotros from "./pages/SobreNosotros/SobreNosotros";
import { UserProvider } from './components/UserContext';

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

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}></Route>
          <Route path="/Registro" element={<Registro/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/HomePage" element={<HomePage/>}></Route>
          <Route path="/API" element={<PseudoAPI/>}></Route>
          <Route path="/Search" element={<Busqueda/>}></Route>                                                                      
          <Route path="/Inventario" element={<Inventario/>}></Route>
          <Route path="/RegistrarInventario" element={<RegistrarInventario/>}></Route>
          <Route path="/Stats" element={<Estadisticas/>}></Route>
          <Route path="/Factura" element={<VisualizarFactura cod_OS={4}/>}></Route>
          <Route path="/factura/:nro_factura" element={<VisualizarFactura/>}></Route>
          <Route path="/RegistrarModelo" element={<RegistrarModelo/>}></Route>
          <Route path="/RegistrarVehiculo" element={<RegistrarVehiculo/>}></Route>
          <Route path="/RegistrarProveedor" element={<RegistrarProveedor/>}></Route>
          <Route path="/RegistrarOrdenCompra" element={<RegistrarOrdenCompra/>}></Route>
          <Route path="/RegistrarPlan" element={<RegistrarPlan/>}></Route>
          <Route path="/RegistrarActividad" element={<RegistrarActividad/>}></Route>
          <Route path="/RegistrarServicio" element={<RegistrarServicio/>}></Route>
          <Route path="/RegistrarFamilia" element={<RegistrarFamilia/>}></Route>
          <Route path="/RegistrarMarca" element={<RegistrarMarca/>}></Route>
          <Route path="/RegistrarOrdenServicio" element={<RegistrarOrdenServicio/>}></Route>
          <Route path="/RegistrarProducto" element={<RegistrarProducto/>}></Route>
          <Route path="/RegistrarEstablecimiento" element={<RegistrarEstablecimiento/>}></Route>
          <Route path="/RegistrarEmpleado" element={<RegistrarEmpleado/>}></Route>
          <Route path="/RegistrarCliente" element={<RegistrarCliente/>}></Route>
          <Route path="/empleado-detalle" element={<EmpleadoDetalle/>}></Route>
          <Route path="/establecimiento-detalle" element={<EstablecimientoDetalle/>}></Route>
          <Route path="/cliente-detalle" element={<ClienteDetalle/>}></Route>
          <Route path="/proveedor-detalle" element={<ProveedorDetalle/>}></Route>
          <Route path="/producto-detalle" element={<ProductoDetalle/>}></Route>
          <Route path="/vehiculo-detalle" element={<VehiculoDetalle/>}></Route>
          <Route path="/marca-detalle" element={<MarcaDetalle/>}></Route>
          <Route path="/modelo-detalle" element={<ModeloDetalle/>}></Route>
          <Route path="/ordenes-servicio" element={<OrdenServicio/>}></Route>
          <Route path="/ordenservicio-detalle/:cod_OS" element={<OrdenServicioDetalle/>}></Route>
          <Route path="/AboutUs" element={<SobreNosotros/>}></Route>
        </Routes>             
      </Router>
    </UserProvider>
  );
}

export default App;                     