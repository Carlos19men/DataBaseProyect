import React, { useState, useEffect } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/button";
import styles from "./RegistrarOrdenCompra.module.css";
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";

const BASE_URL = "http://localhost:1234";

interface ProductoSeleccionado {
    id: string;
    cantidad: number;
}

const RegistrarOrdenCompra: React.FC = () => {
    const [proveedor, setProveedor] = useState("");
    const [establecimiento, setEstablecimiento] = useState("");
    const [producto, setProducto] = useState("");
    const [productosSeleccionados, setProductosSeleccionados] = useState<ProductoSeleccionado[]>([]);
    const [cantidadTemp, setCantidadTemp] = useState<number>(1);
    
    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date().toISOString().split('T')[0];

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

    const handleRemoveProduct = (prodId: string) => {
        setProductosSeleccionados(prev => prev.filter(p => p.id !== prodId));
    };

    const agregarProducto = () => {
        if (producto && !productosSeleccionados.some(p => p.id === producto)) {
            setProductosSeleccionados(prev => [...prev, { 
                id: producto, 
                cantidad: cantidadTemp 
            }]);
            setProducto(""); // Limpiar el select después de agregar
            setCantidadTemp(1); // Resetear la cantidad temporal
        }
    };

    const actualizarCantidad = (id: string, nuevaCantidad: number) => {
        setProductosSeleccionados(prev =>
            prev.map(p => p.id === id ? { ...p, cantidad: nuevaCantidad } : p)
        );
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
        <div>
            <TopBar text="Registrar Orden de Compra" menu={true}></TopBar>
            <div className={styles.container}>
                <div className={styles.detailCard}>
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
                                <input
                                    type="number"
                                    min="1"
                                    value={cantidadTemp}
                                    onChange={(e) => setCantidadTemp(Math.max(1, parseInt(e.target.value) || 1))}
                                    className={styles.cantidadInput}
                                />
                                <button 
                                    className={styles.addButton} 
                                    onClick={agregarProducto}
                                    disabled={!producto}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sección de productos seleccionados en forma de stack */}
                    {productosSeleccionados.length > 0 && (
                        <div className={styles.productosStack}>
                            <span className={styles.label}>Productos Seleccionados:</span>
                            <div className={styles.stackContainer}>
                                {productosSeleccionados.map((prod) => (
                                    <div key={prod.id} className={styles.stackItem}>
                                        <div className={styles.stackContent}>
                                            <span className={styles.productName}>{getProductoNombre(prod.id)}</span>
                                            <div className={styles.cantidadContainer}>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={prod.cantidad}
                                                    onChange={(e) => actualizarCantidad(prod.id, Math.max(1, parseInt(e.target.value) || 1))}
                                                    className={styles.cantidadInput}
                                                />
                                                <button 
                                                    className={styles.removeButton}
                                                    onClick={() => handleRemoveProduct(prod.id)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={styles.centrado}>
                        <Button texto="Registrar Orden" viewHeight={7} fuente={3} />
                    </div>
                    </>}
                </div>
            </div>
        </div>
    );
};

export default RegistrarOrdenCompra; 