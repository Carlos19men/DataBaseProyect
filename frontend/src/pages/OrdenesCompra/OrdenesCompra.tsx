import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./OrdenesCompra.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/button";

const OrdenesCompra: React.FC = () => {
    const [establecimientos, setEstablecimientos] = useState<any[]>([]);
    const [establecimientoSeleccionado, setEstablecimientoSeleccionado] = useState("");
    const [ordenesCompra, setOrdenesCompra] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Cargar establecimientos al montar el componente
    useEffect(() => {
        fetch("http://localhost:1234/establishement")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setEstablecimientos(data);
                }
            })
            .catch(err => console.error("Error cargando establecimientos:", err));
    }, []);

    // Cargar órdenes de compra cuando se selecciona un establecimiento
    useEffect(() => {
        if (!establecimientoSeleccionado) {
            setOrdenesCompra([]);
            return;
        }

        setLoading(true);
        fetch(`http://localhost:1234/purchase-order/establishment/${establecimientoSeleccionado}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setOrdenesCompra(data);
                }
            })
            .catch(err => console.error("Error cargando órdenes:", err))
            .finally(() => setLoading(false));
    }, [establecimientoSeleccionado]);

    return (
        <div>
            <TopBar text="Órdenes de Compra" menu={true} />
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.selectContainer}>
                        <select 
                            value={establecimientoSeleccionado}
                            onChange={(e) => setEstablecimientoSeleccionado(e.target.value)}
                            className={styles.select}
                        >
                            <option value="">Seleccione un establecimiento</option>
                            {establecimientos.map((est) => (
                                <option key={est.RIF} value={est.RIF}>
                                    {est.nombre || est.razon_social} - {est.RIF}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button 
                        texto="Nueva Orden de Compra" 
                        viewHeight={7}
                        onClick={() => navigate('/RegistrarOrdenCompra')}
                    />
                </div>

                <div className={styles.ordenesContainer}>
                    {loading ? (
                        <div className={styles.loading}>Cargando órdenes...</div>
                    ) : ordenesCompra.length > 0 ? (
                        ordenesCompra.map((orden) => (
                            <div key={orden.id} className={styles.ordenCard}>
                                <div className={styles.ordenHeader}>
                                    <h3>Orden #{orden.id}</h3>
                                    <span className={styles.fecha}>{orden.fecha}</span>
                                </div>
                                <div className={styles.ordenInfo}>
                                    <p><strong>Proveedor:</strong> {orden.proveedor_nombre || orden.RIF_proveedor}</p>
                                    <p><strong>Total Productos:</strong> {orden.productos?.length || 0}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.noOrdenes}>
                            {establecimientoSeleccionado 
                                ? "No hay órdenes de compra para este establecimiento"
                                : "Seleccione un establecimiento para ver sus órdenes de compra"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrdenesCompra; 