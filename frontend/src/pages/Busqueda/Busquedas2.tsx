import React, { useEffect, useState } from "react";
import MenuDespegable from "../../components/Menu Desplegable/MenuDesplegable";
import styles from "./Busqueda.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Button from "../../components/Button/button";

// Tipos básicos para los datos (puedes ajustarlos según la respuesta real de tu API)
type Empleado = { nombre: string; [key: string]: any };
type Establecimiento = { nombre: string; [key: string]: any };
type Cliente = { nombre: string; [key: string]: any };
type Proveedor = { nombre: string; [key: string]: any };
type Producto = { nombre: string; [key: string]: any };

type TipoDato = "employee" | "establishement" | "customer" | "suppliers" | "product";

const Busquedas2: React.FC = () => {
  const [busqueda, setBusqueda] = useState<string>("");
  const [tipo, setTipo] = useState<TipoDato>("employee");

  // Estados para cada tipo de datos
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);

  // Estados de carga y error
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetchs iniciales
  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all([
      fetch("http://localhost:1234/employee").then(r => r.json()),
      fetch("http://localhost:1234/establishement").then(r => r.json()),
      fetch("http://localhost:1234/customer").then(r => r.json()),
      fetch("http://localhost:1234/suppliers").then(r => r.json()),
      fetch("http://localhost:1234/product").then(r => r.json()),
    ])
      .then(([emp, est, cli, prov, prod]) => {
        setEmpleados(Array.isArray(emp) ? emp : []);
        setEstablecimientos(Array.isArray(est) ? est : []);
        setClientes(Array.isArray(cli) ? cli : []);
        setProveedores(Array.isArray(prov) ? prov : []);
        setProductos(Array.isArray(prod) ? prod : []);
      })
      .catch(() => setError("No se pueden cargar los datos"))
      .finally(() => setLoading(false));
  }, []);

  // Función para obtener los datos según el tipo seleccionado
  const getDatos = () => {
    switch (tipo) {
      case "employee":
        return empleados;
      case "establishement":
        return establecimientos;
      case "customer":
        return clientes;
      case "suppliers":
        return proveedores;
      case "product":
        return productos;
      default:
        return [];
    }
  };

  // Filtrado por cualquier propiedad (case-insensitive)
  const datosFiltrados = getDatos().filter((item: any) => {
    if (!busqueda) return true;
    return Object.values(item).some((value) =>
      typeof value === "string" && value.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  const renderCard = (item: any, tipo: TipoDato) => {
    if (tipo === "establishement") {
      const nombre = item.nombre || item.name || "";
      const rif = item.RIF || "";
      const encargadoNombre = item.encargado || "";
      let date = item.fecha_encargado || "";
      let dateString = date;
      if (date && typeof date === "string" && date.includes("T")) {
        dateString = date.split("T")[0];
      }
      const ciudad = item.ciudad || item.city || "";
      return (
        <div className={styles.item}>
          <div style={{ fontSize: '1.2em', color: '#2ecc40', fontWeight: 400, marginBottom: '0.2em', wordBreak: 'break-word', minHeight: '2.2em', lineHeight: 1.1 }}>{nombre}</div>
          <div style={{ color: '#222', marginBottom: '0.1em', fontWeight: 400, fontSize: '0.95em' }}>RIF:<span style={{ color: '#444', marginLeft: '0.5em', fontWeight: 400 }}> {rif}</span></div>
          <div style={{ color: '#222', marginBottom: '0.1em', fontWeight: 400, fontSize: '0.95em' }}>Encargado:<span style={{ color: '#444', marginLeft: '0.5em', fontWeight: 400 }}> {encargadoNombre}</span></div>
          <div style={{ color: '#222', marginBottom: '0.1em', fontWeight: 400, fontSize: '0.95em' }}>Fecha de encargo:<span style={{ color: '#444', marginLeft: '0.5em', fontWeight: 400 }}> {dateString}</span></div>
          {ciudad && (
            <div style={{ fontStyle: 'italic', color: '#888', marginTop: '0.5em', fontSize: '0.9em' }}>{ciudad}</div>
          )}
        </div>
      );
    }
    if (tipo === "product") {
      const nombre = item.nombreProducto || "";
      const precio = item.precio || "";
      const isEco = item.tipo;
      const tipoProducto = isEco === "ECOLÓGICO" ? "ECOLÓGICO" : "NO ECOLÓGICO";
      const tipoColor = isEco === "ECOLÓGICO" ? '#2ecc40' : '#e74c3c';
      return (
        <div className={styles.productoCard}>
          <div style={{ fontSize: '1.1em', color: '#222', fontWeight: 800, marginBottom: '0.2em' }}>{nombre}</div>
          <div style={{ color: '#444', fontWeight: 500, fontSize: '0.98em' }}>Precio: <span className={styles.productoPrecio}>{precio}</span></div>
          <div style={{ color: '#444', fontWeight: 500, fontSize: '0.98em' }}>Tipo: <span style={{color: tipoColor}}> {tipoProducto}</span></div>
        </div>
      );
    }
    if (tipo === "customer") {
      const nombre = item.nombre || item.name || "";
      const apellido = item.apellido || item.lastname || "";
      const cedula = item.cedula || item.ci || item.dni || "";
      const correo = item.correo || item.email || "";
      return (
        <div className={styles.clienteCard}>
          <div style={{ fontWeight: 700 }}>{nombre} {apellido}</div>
          <div>Cédula: {cedula}</div>
          <div>Correo: {correo}</div>
        </div>
      );
    }
    if (tipo === "suppliers") {
      const nombre = item.nombre || item.name || "";
      const contacto = item.contacto || item.contact || "";
      const rif = item.rif || item.RIF || "";
      const correo = item.correo || item.email || "";
      return (
        <div className={styles.proveedorCard}>
          <div style={{ fontWeight: 700 }}>{nombre}</div>
          <div>RIF: {rif}</div>
          <div>Contacto: {contacto}</div>
          <div>Correo: {correo}</div>
        </div>
      );
    }
    if (tipo === "employee") {
      const nombre = item.nombre || item.name || "";
      const apellido = item.apellido || item.lastname || "";
      const cedula = item.cedula || item.ci || item.dni || "";
      const cargo = item.cargo || item.position || "";
      return (
        <div className={styles.empleadoCard}>
          <div style={{ fontWeight: 700 }}>{nombre} {apellido}</div>
          <div>Cédula: {cedula}</div>
          <div>Cargo: {cargo}</div>
        </div>
      );
    }
    // Default: renderizado genérico
    return (
      <div>
        {Object.entries(item).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {String(value)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className={styles.bar}>
        <MenuDespegable />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SearchBar
            etiqueta=""
            ejemplo="Buscar"
            viewWidth={70}
            viewHeight={10}
            value={busqueda}
            onSearchClick={() => {}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusqueda(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.columnas}>
        <div className={styles.resultados}>
          {loading ? (
            <div>Cargando...</div>
          ) : error ? (
            <div>{error}</div>
          ) : datosFiltrados.length === 0 ? (
            <div>No hay resultados</div>
          ) : (
            datosFiltrados.map((item: any, idx: number) => (
              <React.Fragment key={idx}>
                {renderCard(item, tipo)}
              </React.Fragment>
            ))
          )}
        </div>
        <div className={styles.filtros}>
          <div className={styles.subtitle}>Filtros</div>
          <Button texto="Empleados" viewHeight={5} onClick={() => setTipo("employee")} selected={tipo === "employee"} />
          <Button texto="Establecimientos" viewHeight={5} onClick={() => setTipo("establishement")} selected={tipo === "establishement"} />
          <Button texto="Clientes" viewHeight={5} onClick={() => setTipo("customer")} selected={tipo === "customer"} />
          <Button texto="Proveedores" viewHeight={5} onClick={() => setTipo("suppliers")} selected={tipo === "suppliers"} />
          <Button texto="Productos" viewHeight={5} onClick={() => setTipo("product")} selected={tipo === "product"} />
        </div>
      </div>
    </div>
  );
};

export default Busquedas2; 