import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const [servicios, setServicios] = useState<{ titulo: string; descripcion: string }[]>([]);
  const [empleados, setEmpleados] = useState<{ titulo: string; descripcion: string }[]>([]);
  const [proveedores, setProveedores] = useState<{ titulo: string; descripcion: string }[]>([]);

 useEffect(() => {
  fetch("http://localhost:1234/servicie")
    .then(res => res.json())
    .then(data => {
      console.log("servicios", data);
      setServicios(
        Array.isArray(data)
          ? data.map((s: any) => ({
              titulo: s.nombre_ser || s.titulo || s.nombre || "Sin título",
              descripcion: s.direccion || s.descripcion || s.detalle || ""
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
              titulo: e.empleado || e.nombre || e.titulo || "Sin nombre",
              descripcion: e.direccion || e.cargo || e.puesto || ""
            }))
          : []
      );
    })
    .catch(() => setEmpleados([]));

  fetch("http://localhost:1234/suppliers")
    .then(res => res.json())
    .then(data => setProveedores(
      Array.isArray(data)
        ? data.map((p: any) => ({
            titulo: p.titulo || p.nombre || p.razon_social || "Sin nombre",
            descripcion: p.descripcion || p.direccion || ""
          }))
        : []
    ))
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