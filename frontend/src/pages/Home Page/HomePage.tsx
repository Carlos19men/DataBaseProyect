import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const [servicios, setServicios] = useState<any[]>([]);
const [empleados, setEmpleados] = useState<any[]>([]);  
const [proveedores, setProveedores] = useState<any[]>([]);

useEffect(() => {
  fetch("http://localhost:1234/servicie")
    .then(res => res.json())
    .then(data => {
      console.log("servicios", data);
      setServicios(
  Array.isArray(data)
    ? data.map((s: any) => ({
        ...s,
        titulo: s.nombre || s.nombre_ser || s.titulo || "Sin título",
        descripcion: "", // o cualquier campo extra si lo tienes
        id: s.id || s.nro_servicio // asegúrate de que el campo exista
      }))
    : []
);
    })
    .catch(() => setServicios([]));

  fetch("http://localhost:1234/employee")
    .then(res => res.json())
    .then(data => {
      console.log("empleados", data);
      setEmpleados(
  Array.isArray(data)
    ? data.map((e: any) => ({
        ...e, // guarda todas las propiedades originales
        titulo: e.empleado || e.nombre || e.titulo || "Sin nombre",
        descripcion: e.direccion || e.cargo || e.puesto || ""
      }))
    : []
);
    })
    .catch(() => setEmpleados([]));

  fetch("http://localhost:1234/suppliers")
    .then(res => res.json())
    .then(data => {console.log("proveedores", data);setProveedores(
  Array.isArray(data)
    ? data.map((p: any) => ({
        ...p,
        titulo: p.razon_social || p.nombre || p.titulo || "Sin nombre",
        descripcion: p.direccion || p.descripcion || ""
      }))
    : []
);
    })
    .catch(() => setProveedores([]));
}, []);
  return (
    <div>
      <TopBar text="Inicio" menu={true}></TopBar>

     <section>
  <h1 className="subtitle" style={{ margin: "5vh" }}>
    Servicios más solicitados de nuestros clientes
  </h1>
  <div className={styles.tarjetaCont}>
    {servicios.slice(0, 3).map((servicio, idx) => (
      <div className={styles.serviceBox} key={idx}>
        <h2>{servicio.titulo}</h2>
        {"id" in servicio && <p><b>ID:</b> {servicio.id}</p>}
        <p>{servicio.descripcion}</p>
      </div>
    ))}
  </div>
</section>

      <section>
  <h1 className="subtitle" style={{ margin: "5vh" }}>
    Empleados más activos
  </h1>
  <div className={styles.tarjetaCont}>
    {empleados.slice(0, 3).map((empleado, idx) => (
      <div className={styles.serviceBox} key={idx}>
        <h2>{empleado.titulo}</h2>
        {/* Si guardas el objeto completo, puedes mostrar más info */}
        {"CI_emp" in empleado && <p><b>Cédula:</b> {empleado.CI_emp}</p>}
        {"Establecimiento" in empleado && <p><b>Establecimiento:</b> {empleado.Establecimiento}</p>}
        {"RIF_establecimiento" in empleado && <p><b>RIF Establecimiento:</b> {empleado.RIF_establecimiento}</p>}
        {"direccion" in empleado && <p><b>Dirección:</b> {empleado.direccion}</p>}
        {"sueldo" in empleado && <p><b>Sueldo:</b> {empleado.sueldo}</p>}
        {/* Si solo tienes titulo/descripcion, muestra eso */}
        <p>{empleado.descripcion}</p>
      </div>
    ))}
  </div>
</section>

      <section>
  <h1 className="subtitle" style={{ margin: "5vh" }}>
    Nuestros proveedores
  </h1>
  <div className={styles.tarjetaCont}>
    {proveedores.slice(0, 3).map((proveedor, idx) => (
      <div className={styles.serviceBox} key={idx}>
        <h2>{proveedor.titulo}</h2>
        {"RIF" in proveedor && <p><b>RIF:</b> {proveedor.RIF}</p>}
        {"razon_social" in proveedor && <p><b>Razón social:</b> {proveedor.razon_social}</p>}
        {"direccion" in proveedor && <p><b>Dirección:</b> {proveedor.direccion}</p>}
        {"local_" in proveedor && <p><b>Local:</b> {proveedor.local_}</p>}
        {"persona_contacto" in proveedor && <p><b>Contacto:</b> {proveedor.persona_contacto}</p>}
        {"telefono" in proveedor && <p><b>Teléfono:</b> {proveedor.telefono}</p>}
        <p>{proveedor.descripcion}</p>
      </div>
    ))}
  </div>
</section>
      <div style={{ transform: "translateY(5vh)" }}>
        <TopBar text="" menu={false}></TopBar>
      </div>
    </div>
  );
};

export default HomePage;