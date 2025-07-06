import Logo from "../../components/Logo/Logo";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./VisualizarFactura.module.css";
import Button from "../../components/Button/button";
import { useEffect, useState } from "react";
import React from "react";
import { useParams, useLocation } from "react-router-dom";

interface Props {
  cod_OS?: number;
}

interface Factura{
    nro_factura: number;
    fecha_emision: string;
    cod_OS: number;
}

interface Cliente{
    CI_cliente: string,
    nombre_cli: string,
    apellido_cli: string
}

interface Establecimiento{
    RIF: number,
    nombre: string,
    ciudad: string
}

interface Vehiculo{
    placa: string,
    codigo: number,
    fecha_entrada: string,
    fecha_salida: string
}

interface Montos{
    monto_total: number,
    iva: number,
    descuento: number
}

interface Pago{
    FechaPago_Tar: string,
    TipoTarjeta: string,
    Banco: string,
    NroTarjeta: string,
    MontoTar: string,
    ReferenciaPM: string,
    FechaPM: string,
    MontoPM: string,
    Telefono: string
}

interface Actividad{
    nombre_ser: string,
    nombre_act: string,
    nombreProducto: string,
    precio_producto: number,
    cantidad: number,
    precio_actividad: number
}

type ActividadesPorServicio = Record<string, Actividad[]>;

const agruparActividadesPorServicio = (actividades: Actividad[]): ActividadesPorServicio => {
  return actividades.reduce((acc, act) => {
    if (!acc[act.nombre_ser]) {
      acc[act.nombre_ser] = [];
    }
    acc[act.nombre_ser].push(act);
    return acc;
  }, {} as ActividadesPorServicio);
};

const VisualizarFactura: React.FC<Props> = ({ cod_OS: propCodOS }) =>{
    const params = useParams();
    const location = useLocation();
    const nro_factura = params.nro_factura;
    const queryParams = new URLSearchParams(location.search);
    const cod_OS = queryParams.get("cod_OS") ? Number(queryParams.get("cod_OS")) : null;
    const [loading, setLoading] = useState(true);
    
    //obtener datos de la factura
    const [factura, setFactura] = useState<Factura | null>(null);
    const [cliente,setCliente] = useState<Cliente | null>(null);
    const [establecimiento,setEstablecimiento] = useState<Establecimiento | null>(null);
    const [vehiculo,setVehiculo] = useState<Vehiculo | null>(null);
    const [montos,setMontos] = useState<Montos | null>(null);
    const [pago,setPago] = useState<Pago | null>(null);
    const [actividadesPorServicio, setActividadesPorServicio] = useState<ActividadesPorServicio>({});

    // Limpiar estado y logs al cambiar cod_OS
    useEffect(() => {
      console.log('Cambiando cod_OS a:', cod_OS);
      setFactura(null);
      setCliente(null);
      setEstablecimiento(null);
      setVehiculo(null);
      setMontos(null);
      setPago(null);
      setActividadesPorServicio({});
      setLoading(true);
    }, [cod_OS]);

    //obtener datos de la factura
    useEffect(() => {
        if (nro_factura && !cod_OS) {
            fetch(`http://localhost:1234/invoices/${nro_factura}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Error al obtener datos de la factura");
                    return res.json();
                })
                .then((data: Factura[]) => {
                    if (data && data[0]) {
                        // setCodOS(data[0].cod_OS); // Ya no se usa estado
                        setFactura(data[0]);
                    }
                })
                .catch((err) => {
                    console.error("Error:", err);
                    setLoading(false);
                });
        } else if (cod_OS) {
            fetch(`http://localhost:1234/invoice/factura/${cod_OS}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Error al obtener datos");
                    return res.json();
                })
                .then((data: Factura[]) => {
                    console.log('Factura:', data[0]);
                    setFactura(data[0] || null);
                })
                .catch((err) => {
                    console.error("Error:", err);
                });
        }
    }, [nro_factura, cod_OS]);

    //obtener informacion del cliente
    useEffect(() => {
        if (!cod_OS) return;
        fetch(`http://localhost:1234/invoice/cliente/${cod_OS}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al obtener datos");
                return res.json();
            })
            .then((data: Cliente[]) => {
                console.log('Cliente:', data[0]);
                setCliente(data[0] || null);
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    }, [cod_OS]);

    //obtener informacion del establecimiento
    useEffect(() => {
        if (!cod_OS) return;
        fetch(`http://localhost:1234/invoice/establecimiento/${cod_OS}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al obtener datos");
                return res.json();
            })
            .then((data: Establecimiento[]) => {
                console.log('Establecimiento:', data[0]);
                setEstablecimiento(data[0] || null);
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    }, [cod_OS]);

    //obtener informacion del vehiculo
    useEffect(() => {
        if (!cod_OS) return;
        fetch(`http://localhost:1234/invoice/vehiculo/${cod_OS}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al obtener datos");
                return res.json();
            })
            .then((data: Vehiculo[]) => {
                console.log('Vehiculo:', data[0]);
                setVehiculo(data[0] || null);
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    }, [cod_OS]);

    //obtener informacion de los pagos
    useEffect(() => {
        if (!cod_OS) return;
        fetch(`http://localhost:1234/invoice/pago/${cod_OS}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al obtener datos");
                return res.json();
            })
            .then((data: Pago[]) => {
                console.log('Pago:', data[0]);
                setPago(data[0] || null);
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    }, [cod_OS]);

    //obtener informacion de los montos
    useEffect(() => {
        if (!cod_OS) return;
        fetch(`http://localhost:1234/invoice/montos/${cod_OS}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al obtener datos");
                return res.json();
            })
            .then((data: Montos[]) => {
                console.log('Montos:', data[0]);
                setMontos(data[0] || null);
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    }, [cod_OS]);

    //obtener informacion de los servicios
    useEffect(() => {
        if (!cod_OS) return;
        fetch(`http://localhost:1234/invoice/servicio/${cod_OS}`)
            .then(res => res.json())
            .then((data: Actividad[]) => {
                const agrupadas = agruparActividadesPorServicio(data);
                console.log('Actividades:', agrupadas);
                setActividadesPorServicio(agrupadas);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar actividades:", err);
                setLoading(false);
            });
    }, [cod_OS]);
    
    // Mostrar estado de carga
    if (loading) {
        return (
            <div>
                <TopBar menu={false} text="Visualizar Factura"></TopBar>
                <div className={styles.facturaContainer}>
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <h3>Cargando información de la factura...</h3>
                    </div>
                </div>
            </div>
        );
    }
    
    return(
        <div>
            <TopBar menu={false} text="Visualizar Factura"></TopBar>
            <div className={styles.facturaContainer}>
                <div className={styles.containerMain}>
                    <div className={styles.logo}>
                        <Logo view={15}></Logo>
                        <div className={styles.subtitle}>
                            <h2 className="title">M&U</h2>
                        </div>
                    </div>
                    <div className={styles.subtitle}>
                        <h2 className="title">FACTURA</h2>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.subtitle}>
                        <h2 className="subtitle">INFORMACION DEL CLIENTE:</h2>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">CI:</h1>
                            </div>
                            <h1 className="minitext">{cliente?.CI_cliente ?? "..."}</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Nombre:</h1>
                            </div>
                            <h1 className="minitext">{cliente?.nombre_cli ?? "..."}</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Apellido:</h1>
                            </div>
                            <h1 className="minitext">{cliente?.apellido_cli ?? "..."}</h1>
                        </div>
                    </div>
                    <div className={styles.subtitle}>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Nº FACTURA:</h1>
                            </div>
                            <h1 className="minitext">{factura?.nro_factura ?? "..."}</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Fecha:</h1>
                            </div>
                            <h1 className="minitext">{factura ? new Date(factura.fecha_emision).toLocaleDateString("es-VE") : "..."}</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.subtitle}>
                        <h2 className="subtitle">INFORMACION DEL ESTABLECIMIENTO:</h2>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Nombre:</h1>
                            </div>
                            <h1 className="minitext">{establecimiento?.nombre ?? "..."}</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">RIF:</h1>
                            </div>
                            <h1 className="minitext">{establecimiento?.RIF ?? "..."}</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Ciudad:</h1>
                            </div>
                            <h1 className="minitext">{establecimiento?.ciudad ?? "..."}</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.subtitle}>
                        <h2 className="subtitle">INFORMACION DEL VEHICULO:</h2>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Placa del Vehiculo:</h1>
                            </div>
                            <h1 className="minitext">{vehiculo?.placa ?? "..."}</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">ID del Vehiculo:</h1>
                            </div>
                            <h1 className="minitext">{vehiculo?.codigo ?? "..."}</h1>
                        </div>
                    </div>
                    <div className={styles.subtitle}>
                        <div className={styles.elements}>&nbsp;</div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Fecha entrada:</h1>
                            </div>
                            <h1 className="minitext">{vehiculo ? new Date(vehiculo.fecha_entrada).toLocaleDateString("es-VE") : "..."}</h1>
                        </div> 
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Fecha salida:</h1>
                            </div>
                            <h1 className="minitext">{vehiculo ? new Date(vehiculo.fecha_salida).toLocaleDateString("es-VE") : "..."}</h1>
                        </div>
                    </div>
                </div>
                {/* TABLA DE ACTIVIDADES/SERVICIOS */}
                <div className={styles.actividadesTableWrapper}>
                    <table className={styles.actividadesTable}>
                        <thead>
                            <tr>
                                <th className={styles.headerCell}>Servicio</th>
                                <th className={styles.headerCell}>Actividad</th>
                                <th className={styles.headerCell}>Producto</th>
                                <th className={styles.headerCell}>Precio Actividad</th>
                                <th className={styles.headerCell}>Precio Producto</th>
                                <th className={styles.headerCell}>Cantidad</th>
                                <th className={styles.headerCell}>Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(actividadesPorServicio).map(([servicio, actividades]) =>
                                actividades.map((actividad, actividadIndex) => {
                                    const montoActividad = (actividad.precio_actividad || 0) + ((actividad.precio_producto || 0) * (actividad.cantidad || 0));
                                    return (
                                        <tr key={`${servicio}-${actividadIndex}`}>
                                            <td>{servicio}</td>
                                            <td>{actividad.nombre_act}</td>
                                            <td>{actividad.nombreProducto || '-'}</td>
                                            <td>${actividad.precio_actividad?.toFixed(2) || '0.00'}</td>
                                            <td>${actividad.precio_producto?.toFixed(2) || '0.00'}</td>
                                            <td>{actividad.cantidad || '0'}</td>
                                            <td>${montoActividad.toFixed(2)}</td>
                                        </tr>
                                    );
                                })
                            )}
                            {/* Fila del total general */}
                            {Object.keys(actividadesPorServicio).length > 0 && (
                                <tr className={styles.totalRow}>
                                    <td colSpan={6} style={{textAlign:'right', fontWeight:'bold'}}>TOTAL GENERAL:</td>
                                    <td style={{fontWeight:'bold'}}>
                                        ${Object.values(actividadesPorServicio)
                                            .flat()
                                            .reduce((sum, act) => {
                                                const montoActividad = (act.precio_actividad || 0) + ((act.precio_producto || 0) * (act.cantidad || 0));
                                                return sum + montoActividad;
                                            }, 0)
                                            .toFixed(2)}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className={styles.container}>
                    <div className={styles.subtitle}>
                        <h2 className="subtitle">INFORMACION DE PAGO:</h2>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Fecha Pago Tarjeta</h1>
                            </div>
                            <h1 className="minitext">{pago ? new Date(pago.FechaPago_Tar).toLocaleDateString("es-VE") : "..."}</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Tipo Tarjeta:</h1>
                            </div>
                            <h1 className="minitext">{pago? new Date(pago.TipoTarjeta).toLocaleDateString("es-VE") : "..."}</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Banco:</h1>
                            </div>
                            <h1 className="minitext">{pago?.Banco ?? "..."}</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Numero de Tarjeta:</h1>
                            </div>
                            <h1 className="minitext">{pago?.NroTarjeta ?? "..."}</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Referencia Pago Movil:</h1>
                            </div>
                            <h1 className="minitext">{pago?.ReferenciaPM?? "..."}</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Fecha de Pago Movil:</h1>
                            </div>
                            <h1 className="minitext">{pago? new Date(pago.FechaPM).toLocaleDateString("es-VE") : "..."}</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Monto Pago Movil:</h1>
                            </div>
                            <h1 className="minitext">{pago?.MontoPM ?? "..."}</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Telefono:</h1>
                            </div>
                            <h1 className="minitext">{pago?.Telefono ?? "..."}</h1>
                        </div>
                    </div>
                    <div className={styles.subtitle}>
                        <div className={styles.elements}>&nbsp;</div>
                        <div className={styles.elements}>
                            <h2 className="subtitle">Monto:</h2>
                            <span className={styles.valorMonto}>
                                {Object.values(actividadesPorServicio)
                                    .flat()
                                    .reduce((sum, act) => {
                                        const montoActividad = (act.precio_actividad || 0) + ((act.precio_producto || 0) * (act.cantidad || 0));
                                        return sum + montoActividad;
                                    }, 0)
                                    .toFixed(2)}
                            </span>
                        </div> 
                        <div className={styles.elements}>
                            <h2 className="subtitle">Descuento:</h2>
                            <span className={styles.valorMonto}>{montos?.descuento ?? "..."}</span>
                        </div>
                        <div className={styles.elements}>
                            <h2 className="subtitle">IVA:</h2>
                            <span className={styles.valorMonto}>{montos?.iva ?? "..."}</span>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.montoTotalWrapper}>
                                <div className={styles.lineaSobreMonto}></div>
                                <Button texto={"Monto Total:"} viewHeight={8} />
                            </div>
                            <h1 className="minitext">{montos?.monto_total ?? "..."}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VisualizarFactura;