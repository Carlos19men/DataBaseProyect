import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuDespegable from "../../components/Menu Desplegable/MenuDespegable";
import styles from "./Inventario.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Button from "../../components/Button/button";

// Tipos básicos para los datos de inventario y alertas
type Inventario = { 
    id_producto?: string;
    nombreProducto?: string;
    cantidad?: number;
    stock_minimo?: number;
    stock_maximo?: number;
    ubicacion?: string;
    [key: string]: any 
};

type Alerta = { 
    id?: number;
    RIF_Establecimiento?: string;
    id_producto?: number;
    fecha?: string;
    nombreProducto?: string;
    cantidad?: number;
    minimo?: number;
    maximo?: number;
    nombreEstablecimiento?: string;
    [key: string]: any 
};

type TipoDato = "inventario" | "alertas";

const Inventario: React.FC = () => {
    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState<string>("");
    const [tipo, setTipo] = useState<TipoDato>("inventario");
    const [filtroRIF, setFiltroRIF] = useState<string>("");

    // Estados para cada tipo de datos
    const [inventario, setInventario] = useState<Inventario[]>([]);
    const [alertas, setAlertas] = useState<Alerta[]>([]);
    const [establecimientos, setEstablecimientos] = useState<any[]>([]);

    // Estados de carga y error
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    // Funciones de navegación
    const handleInventarioClick = (item: Inventario) => {
        navigate('/producto-detalle', { state: { producto: item, id: item.id_producto } });
    };

    const handleAlertaClick = (alerta: Alerta) => {
        // Navegar a una página de detalle de alerta (puedes crear esta página después)
        console.log("Alerta clickeada:", alerta);
    };

    // Función para manejar el clic del FAB según el tipo de entidad
    const handleFabClick = () => {
        switch (tipo) {
            case "inventario":
                navigate('/RegistrarInventario');
                break;
            case "alertas":
                // Aquí podrías navegar a una página para crear alertas
                console.log("Crear nueva alerta");
                break;
            default:
                navigate('/RegistrarInventario');
        }
    };

    // Fetchs iniciales
    useEffect(() => {
        setLoading(true);
        setError("");
        Promise.all([
            fetch("http://localhost:1234/inventory").then(r => r.json()),
            fetch("http://localhost:1234/alertas").then(r => r.json()).catch(() => []), // Endpoint de alertas (puede no existir aún)
            fetch("http://localhost:1234/establishement").then(r => r.json()).catch(() => []), // Cargar establecimientos
        ])
            .then(([inv, al, est]) => {
                console.log("Datos de inventario:", inv);
                setInventario(Array.isArray(inv) ? inv : []);
                setAlertas(Array.isArray(al) ? al : []);
                setEstablecimientos(Array.isArray(est) ? est : []);
            })
            .catch(() => setError("No se pueden cargar los datos"))
            .finally(() => setLoading(false));
    }, []);

    // Función para obtener los datos según el tipo seleccionado
    const getDatos = () => {
        switch (tipo) {
            case "inventario":
                return inventario;
            case "alertas":
                return alertas;
            default:
                return [];
        }
    };

    // Filtrado por cualquier propiedad (case-insensitive) y por RIF
    const datosFiltrados = getDatos().filter((item: any) => {
        // Filtro por búsqueda general
        const cumpleBusqueda = !busqueda || Object.values(item).some((value) =>
            typeof value === "string" && value.toLowerCase().includes(busqueda.toLowerCase())
        );

        // Filtro por RIF (para inventario y alertas)
        let cumpleFiltroRIF = true;
        if (filtroRIF) {
            if (tipo === "inventario") {
                cumpleFiltroRIF = item.RIF_establecimiento && item.RIF_establecimiento === filtroRIF;
            } else if (tipo === "alertas") {
                cumpleFiltroRIF = item.RIF_Establecimiento && item.RIF_Establecimiento === filtroRIF;
            }
        }

        return cumpleBusqueda && cumpleFiltroRIF;
    });

    const renderCard = (item: any, tipo: TipoDato) => {
        if (tipo === "inventario") {
            const nombre = item.nombre || "Producto sin nombre";
            const cantidad = item.cantidad || 0;
            const rifEstablecimiento = item.RIF_establecimiento || "RIF no disponible";
            const stockMinimo = item.minimo || 0;
            const stockMaximo = item.maximo || 0;
            const ubicacion = item.ubicacion || "";

            // Función para truncar texto si excede 200 caracteres
            const truncarTexto = (texto: string) => {
                if (texto.length > 200) {
                    return texto.substring(0, 200) + '...';
                }
                return texto;
            };

            // Determinar el estado del stock
            const getStockStatus = () => {
                if (cantidad < 20) return "stock-bajo";
                if (cantidad >= 20) return "stock-alto";
                return "stock-normal";
            };

            const stockStatus = getStockStatus();

            return (
                <div className={styles.inventarioCard} onClick={() => handleInventarioClick(item)}>
                    <h3 className={styles.inventarioTitulo}>{truncarTexto(nombre)}</h3>
                    <p className={styles.inventarioEtiqueta}>RIF Establecimiento: <span className={styles.inventarioValor}>{rifEstablecimiento}</span></p>
                    <p className={styles.inventarioEtiqueta}>Cantidad: <span className={styles.inventarioValor}>{cantidad}</span></p>
                    <p className={styles.inventarioEtiqueta}>Stock Mínimo: <span className={styles.inventarioValor}>{stockMinimo}</span></p>
                    <p className={styles.inventarioEtiqueta}>Stock Máximo: <span className={styles.inventarioValor}>{stockMaximo}</span></p>
                    {ubicacion && (
                        <p className={styles.inventarioEtiqueta}>Ubicación: <span className={styles.inventarioValor}>{truncarTexto(ubicacion)}</span></p>
                    )}
                    <div className={`${styles.stockStatus} ${styles[stockStatus]}`}>
                        {stockStatus === "stock-bajo" && "⚠️ Stock Bajo"}
                        {stockStatus === "stock-alto" && "📦 Stock Alto"}
                        {stockStatus === "stock-normal" && "✅ Stock Normal"}
                    </div>
                </div>
            );
        }

        if (tipo === "alertas") {
            const nombreProducto = item.nombreProducto || "Producto sin nombre";
            const rifEstablecimiento = item.RIF_Establecimiento || "RIF no disponible";
            const nombreEstablecimiento = item.nombreEstablecimiento || "Establecimiento no disponible";
            const cantidad = item.cantidad || 0;
            const minimo = item.minimo || 0;
            const maximo = item.maximo || 0;
            const fecha = item.fecha || "";

            // Función para truncar texto si excede 200 caracteres
            const truncarTexto = (texto: string) => {
                if (texto.length > 200) {
                    return texto.substring(0, 200) + '...';
                }
                return texto;
            };

            // Determinar la severidad de la alerta basada en la cantidad vs mínimo
            const getSeveridadAlerta = () => {
                if (cantidad === 0) return "alertaUrgente";
                if (cantidad <= minimo * 0.5) return "alertaUrgente";
                if (cantidad <= minimo) return "alertaModerada";
                return "alertaLeve";
            };

            const severidadClass = getSeveridadAlerta();

            return (
                <div className={`${styles.alertaCard} ${styles[severidadClass]}`} onClick={() => handleAlertaClick(item)}>
                    <h3 className={styles.alertaTitulo}>⚠️ Stock Bajo - {truncarTexto(nombreProducto)}</h3>
                    <p className={styles.alertaEtiqueta}>Establecimiento: <span className={styles.alertaValor}>{nombreEstablecimiento}</span></p>
                    <p className={styles.alertaEtiqueta}>RIF: <span className={styles.alertaValor}>{rifEstablecimiento}</span></p>
                    <p className={styles.alertaEtiqueta}>Cantidad Actual: <span className={styles.alertaValor}>{cantidad}</span></p>
                    <p className={styles.alertaEtiqueta}>Stock Mínimo: <span className={styles.alertaValor}>{minimo}</span></p>
                    <p className={styles.alertaEtiqueta}>Fecha Alerta: <span className={styles.alertaValor}>{new Date(fecha).toLocaleDateString()}</span></p>
                </div>
            );
        }

        return null;
    };

    if (loading) {
        return (
            <div>
                <div className={styles.bar}>
                    <MenuDespegable></MenuDespegable>
                </div>
                <div style={{ textAlign: "center", padding: "5vh" }}>
                    <h2>Cargando datos...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <div className={styles.bar}>
                    <MenuDespegable></MenuDespegable>
                </div>
                <div style={{ textAlign: "center", padding: "5vh" }}>
                    <h2>Error: {error}</h2>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className={styles.bar}>
                <MenuDespegable></MenuDespegable>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <SearchBar 
                        etiqueta="" 
                        ejemplo="Buscar" 
                        viewWidth={70} 
                        viewHeight={8} 
                        value={busqueda} 
                        onSearchClick={() => {}} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setBusqueda(e.target.value) }}
                    />
                </div>
            </div>

            <div className={styles.columnas}>
                <div className={styles.resultados}>
                    {datosFiltrados.length === 0 ? (
                        <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "5vh" }}>
                            <h3>No se encontraron resultados</h3>
                        </div>
                    ) : (
                        datosFiltrados.map((item: any, idx: number) => (
                            <div key={idx}>
                                {renderCard(item, tipo)}
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.filtros}>
                    <div className={styles.subtitle}>Filtros</div>
                    <Button 
                        texto="Inventario" 
                        viewHeight={5} 
                        onClick={() => { setTipo("inventario"); }} 
                        selected={tipo === "inventario"}
                    />
                    <Button 
                        texto="Verificar Alertas" 
                        viewHeight={5} 
                        onClick={() => { setTipo("alertas"); }} 
                        selected={tipo === "alertas"}
                    />
                    
                    {/* Filtro por RIF - visible para inventario y alertas */}
                    {(tipo === "inventario" || tipo === "alertas") && (
                        <div className={styles.filtroRIFContainer}>
                            <label className={styles.filtroRIFLabel}>Filtrar por RIF:</label>
                            <select
                                className={styles.filtroRIFSelect}
                                value={filtroRIF}
                                onChange={(e) => setFiltroRIF(e.target.value)}
                            >
                                <option value="">Todos los establecimientos</option>
                                {establecimientos.map((establecimiento) => (
                                    <option key={establecimiento.RIF} value={establecimiento.RIF}>
                                        {establecimiento.RIF} - {establecimiento.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>

            {/* FAB para agregar nuevo elemento */}
            <button className={styles.fab} onClick={handleFabClick}>
                +
            </button>
        </div>
    );
};

export default Inventario; 