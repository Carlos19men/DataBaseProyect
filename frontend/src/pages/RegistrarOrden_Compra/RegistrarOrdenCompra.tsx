import React, { useState, useEffect } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/button";
import styles from "./RegistrarOrdenCompra.module.css";

const BASE_URL = "http://localhost:1234";

const RegistrarOrdenCompra: React.FC = () => {
    const [proveedor, setProveedor] = useState("");
    const [establecimiento, setEstablecimiento] = useState("");
    const [producto, setProducto] = useState("");
    const [productosSeleccionados, setProductosSeleccionados] = useState<string[]>([]);
    const [fecha, setFecha] = useState({ dd: "", mm: "", aa: "" });

    // Estados para datos del backend
    const [proveedores, setProveedores] = useState<any[]>([]);
    const [establecimientos, setEstablecimientos] = useState<any[]>([]);
    const [productos, setProductos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");
        Promise.all([
            fetch(`${BASE_URL}/suppliers/`).then(res => res.json()),
            fetch(`${BASE_URL}/establishement/`).then(res => res.json()),
            fetch(`${BASE_URL}/product/`).then(res => res.json()),
        ])
        .then(([proveedoresData, establecimientosData, productosData]) => {
            setProveedores(proveedoresData);
            setEstablecimientos(establecimientosData);
            setProductos(productosData);
        })
        .catch(() => setError("Error al cargar los datos desde el backend"))
        .finally(() => setLoading(false));
    }, []);

    const handleCheckbox = (prodId: string) => {
        setProductosSeleccionados(prev =>
            prev.includes(prodId)
                ? prev.filter(p => p !== prodId)
                : [...prev, prodId]
        );
    };

    const agregarProducto = () => {
        if (producto && !productosSeleccionados.includes(producto)) {
            setProductosSeleccionados(prev => [...prev, producto]);
            setProducto(""); // Limpiar el select después de agregar
        }
    };

    // Utilidades para mostrar el nombre en base al id seleccionado
    const getProveedorNombre = (id: string) => {
        const p = proveedores.find((prov: any) => String(prov.id) === String(id) || String(prov.RIF) === String(id));
        return p ? (p.nombre || p.razon_social || p.RIF) : id;
    };
    const getEstablecimientoNombre = (id: string) => {
        const e = establecimientos.find((est: any) => String(est.id) === String(id) || String(est.RIF) === String(id));
        return e ? (e.nombre || e.razon_social || e.RIF) : id;
    };
    const getProductoNombre = (id: string) => {
        const p = productos.find((prod: any) => String(prod.id) === String(id) || String(prod.codigo) === String(id));
        return p ? (p.nombre || p.descripcion || p.codigo) : id;
    };

    return (
        <div className={styles.body}>
            <TopBar text="Registrar Orden de Compra" menu={true} />
            <div className={styles.content}>
                {loading && <div>Cargando datos...</div>}
                {error && <div style={{color: 'red'}}>{error}</div>}
                {!loading && !error && <>
                <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                        <span className={styles.label}>Proveedor:</span>
                        <select className={styles.select} value={proveedor} onChange={e => setProveedor(e.target.value)}>
                            <option value="">Seleccione</option>
                            {proveedores.map((p: any) => (
                                <option key={p.id || p.RIF} value={p.id || p.RIF}>{p.nombre || p.razon_social || p.RIF}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.fieldGroup}>
                        <span className={styles.label}>Establecimiento:</span>
                        <select className={styles.select} value={establecimiento} onChange={e => setEstablecimiento(e.target.value)}>
                            <option value="">Seleccione</option>
                            {establecimientos.map((e: any) => (
                                <option key={e.id || e.RIF} value={e.id || e.RIF}>{e.nombre || e.razon_social || e.RIF}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                        <span className={styles.label}>Agregar Productos:</span>
                        <div className={styles.productInputGroup}>
                            <select className={styles.select} value={producto} onChange={e => setProducto(e.target.value)}>
                                <option value="">Seleccione</option>
                                {productos.map((p: any) => (
                                    <option key={p.id || p.codigo} value={p.id || p.codigo}>{p.nombre || p.descripcion || p.codigo}</option>
                                ))}
                            </select>
                            <button 
                                className={styles.addButton} 
                                onClick={agregarProducto}
                                disabled={!producto}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className={styles.fieldGroup}>
                        <span className={styles.label}>Fecha:</span>
                        <div className={styles.dateInputs}>
                            <input className={styles.dateInput} type="text" maxLength={2} placeholder="DD" value={fecha.dd} onChange={e => setFecha(f => ({ ...f, dd: e.target.value }))} />
                            <input className={styles.dateInput} type="text" maxLength={2} placeholder="MM" value={fecha.mm} onChange={e => setFecha(f => ({ ...f, mm: e.target.value }))} />
                            <input className={styles.dateInput} type="text" maxLength={2} placeholder="AA" value={fecha.aa} onChange={e => setFecha(f => ({ ...f, aa: e.target.value }))} />
                        </div>
                    </div>
                </div>
                {productosSeleccionados.length > 0 && (
                    <div className={styles.checkboxSection}>
                        <span className={styles.label}>Productos Seleccionados:</span>
                        <div className={styles.checkboxGrid}>
                            {productosSeleccionados.map(id => (
                                <div key={id} className={styles.checkboxRow}>
                                    <input type="checkbox" id={id} checked={true} onChange={() => handleCheckbox(id)} />
                                    <label htmlFor={id} className={styles.checkboxLabel}>{getProductoNombre(id)}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className={styles.buttonContainer}>
                    <Button texto="Añadir" viewHeight={7} fuente={3} />
                </div>
                </>}
            </div>
        </div>
    );
};

export default RegistrarOrdenCompra; 