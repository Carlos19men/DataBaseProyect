import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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

  // Funciones de navegación
  const handleEmpleadoClick = (empleado: any) => {
    navigate('/empleado-detalle', { state: { empleado } });
  };

  const handleEstablecimientoClick = (establecimiento: any) => {
    navigate('/establecimiento-detalle', { state: { establecimiento } });
  };

  const handleClienteClick = (cliente: any) => {
    navigate('/cliente-detalle', { state: { cliente, ci: cliente.CI } });
  };

  const handleProveedorClick = (proveedor: any) => {
    navigate('/proveedor-detalle', { state: { proveedor } });
  };

  const handleProductoClick = (producto: any) => {
    navigate('/producto-detalle', { state: { producto } });
  };

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
        console.log("Datos de empleados:", emp);
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
      
      // Función para truncar texto si excede 200 caracteres
      const truncarTexto = (texto: string) => {
        if (texto.length > 200) {
          return texto.substring(0, 200) + '...';
        }
        return texto;
      };
      
      return (
        <div className={styles.establecimientoCard} onClick={() => handleEstablecimientoClick(item)}>
          <h3 className={styles.establecimientoTitulo}>{truncarTexto(nombre)}</h3>
          <p className={styles.establecimientoEtiqueta}>RIF: <span className={styles.establecimientoValor}>{truncarTexto(rif)}</span></p>
          <p className={styles.establecimientoEtiqueta}>Encargado: <span className={styles.establecimientoValor}>{truncarTexto(encargadoNombre)}</span></p>
          <p className={styles.establecimientoEtiqueta}>Fecha de encargo: <span className={styles.establecimientoValor}>{dateString}</span></p>
          {ciudad && (
            <p className={styles.establecimientoEtiqueta}>Ciudad: <span className={styles.establecimientoValor}>{truncarTexto(ciudad)}</span></p>
          )}
        </div>
      );
    }
    if (tipo === "product") {
      const nombre = item.nombreProducto || "";
      const precio = item.precio || "";
      const isEco = item.tipo;
      const tipoProducto = isEco === "ECOLÓGICO" ? "ECOLÓGICO" : "NO ECOLÓGICO";
      const familia = item.Familia || "";
      const nivelContaminacion = item.nivel_contaminacion || 1;
      
      // Función para truncar texto si excede 200 caracteres
      const truncarTexto = (texto: string) => {
        if (texto.length > 200) {
          return texto.substring(0, 200) + '...';
        }
        return texto;
      };
      
      // Función para obtener la clase de color según el nivel de contaminación
      const getNivelContaminacionClass = (nivel: number) => {
        switch (nivel) {
          case 1: return styles.productoNivelContaminacion1;
          case 2: return styles.productoNivelContaminacion2;
          case 3: return styles.productoNivelContaminacion3;
          case 4: return styles.productoNivelContaminacion4;
          case 5: return styles.productoNivelContaminacion5;
          default: return styles.productoNivelContaminacion1;
        }
      };
      
      return (
        <div className={styles.productoCard} onClick={() => handleProductoClick(item)}>
          <h3 className={styles.productoTitulo}>{truncarTexto(nombre)}</h3>
          <p className={styles.productoEtiqueta}>Precio: <span className={styles.productoPrecio}>${precio}</span></p>
          <p className={styles.productoEtiqueta}>Familia: <span className={styles.productoValor}>{truncarTexto(familia)}</span></p>
          <p className={styles.productoEtiqueta}>Tipo: <span className={isEco === "ECOLÓGICO" ? styles.productoTipoEco : styles.productoTipoNoEco}>{tipoProducto}</span></p>
          <p className={styles.productoEtiqueta}>Nivel de Contaminación: <span className={getNivelContaminacionClass(nivelContaminacion)}>{nivelContaminacion}/5</span></p>
        </div>
      );
    }
    if (tipo === "customer") {
      const nombre = item.cliente || "";
      const cedula = item.CI || "";
      const correo = item.correo || "";
      const telefono1 = item.telefono1 || "";
      const telefono2 = item.telefono2 || "";
      return (
        <div className={styles.clienteCard} onClick={() => handleClienteClick(item)}>
          <h3 className={styles.clienteTitulo}>{nombre}</h3>
          <p className={styles.clienteEtiqueta}>Cédula: <span className={styles.clienteValor}>{cedula}</span></p>
          <p className={styles.clienteEtiqueta}>Correo: <span className={styles.clienteValor}>{correo}</span></p>
          <p className={styles.clienteEtiqueta}>Contactos: <span className={styles.clienteValor}>{telefono1} / {telefono2}</span></p>
        </div>
      );
    }
    if (tipo === "suppliers") {
      const razonSocial = item.razon_social || "";
      const rif = item.RIF || "";
      const direccion = item.direccion || "";
      const personaContacto = item.persona_contacto || "";
      const local = item.local_ || "";
      const telefono = item.telefono || "";
      
      // Función para truncar texto si excede 200 caracteres
      const truncarTexto = (texto: string) => {
        if (texto.length > 200) {
          return texto.substring(0, 200) + '...';
        }
        return texto;
      };
      
      return (
        <div className={styles.proveedorCard} onClick={() => handleProveedorClick(item)}>
          <h3 className={styles.proveedorTitulo}>{truncarTexto(razonSocial)}</h3>
          <p className={styles.proveedorEtiqueta}>RIF: <span className={styles.proveedorValor}>{truncarTexto(rif)}</span></p>
          <p className={styles.proveedorEtiqueta}>Dirección: <span className={styles.proveedorValor}>{truncarTexto(direccion)}</span></p>
          <p className={styles.proveedorEtiqueta}>Contacto: <span className={styles.proveedorValor}>{truncarTexto(personaContacto)} - {truncarTexto(local)} - {truncarTexto(telefono)}</span></p>
        </div>
      );
    }
    if (tipo === "employee") {
      const nombre = item.empleado || "";
      const cedula = item.CI_emp || "";
      const establecimiento = item.Establecimiento || "";
      const rifEstablecimiento = item.RIF_establecimiento || "";
      const sueldo = item.sueldo || "";
      const direccion = item.direccion || "";
      return (
        <div className={styles.empleadoCard} onClick={() => handleEmpleadoClick(item)}>
          <h3 className={styles.empleadoTitulo}>{nombre}</h3>
          <p className={styles.empleadoEtiqueta}>Cédula: <span className={styles.empleadoValor}>{cedula}</span></p>
          <p className={styles.empleadoEtiqueta}>Establecimiento: <span className={styles.empleadoValor}>{establecimiento}</span></p>
          <p className={styles.empleadoEtiqueta}>RIF Establecimiento: <span className={styles.empleadoValor}>{rifEstablecimiento}</span></p>
          <p className={styles.empleadoEtiqueta}>Sueldo: <span className={styles.empleadoValor}>${sueldo}</span></p>
          <p className={styles.empleadoEtiqueta}>Dirección: <span className={styles.empleadoValor}>{direccion}</span></p>
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