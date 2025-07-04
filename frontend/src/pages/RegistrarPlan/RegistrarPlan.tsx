import React, { useState, useEffect } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/button";
import styles from "./RegistrarPlan.module.css";

const BASE_URL = "http://localhost:1234";

const RegistrarPlan: React.FC = () => {
    // Estados para selects y campos
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [kilometraje, setKilometraje] = useState("");
    const [nombrePlan, setNombrePlan] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [servicio, setServicio] = useState("");
    const [actividad, setActividad] = useState("");
    const [serviciosSeleccionados, setServiciosSeleccionados] = useState<any[]>([]);
    const [actividadesSeleccionadas, setActividadesSeleccionadas] = useState<any[]>([]);

    // Datos del backend
    const [marcas, setMarcas] = useState<any[]>([]);
    const [modelos, setModelos] = useState<any[]>([]);
    const [servicios, setServicios] = useState<any[]>([]);
    const [actividades, setActividades] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [loadingModelos, setLoadingModelos] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError("");
        Promise.all([
            fetch(`${BASE_URL}/brand/`).then(res => res.json()),
            fetch(`${BASE_URL}/servicie/`).then(res => res.json()),
            fetch(`${BASE_URL}/activity/`).then(res => res.json()),
        ])
        .then(([marcasData, serviciosData, actividadesData]) => {
            setMarcas(marcasData);
            setServicios(serviciosData);
            setActividades(actividadesData);
        })
        .catch(() => setError("Error al cargar los datos desde el backend"))
        .finally(() => setLoading(false));
    }, []);

    // Cuando cambia la marca, obtener los modelos de esa marca
    useEffect(() => {
        if (marca) {
            setLoadingModelos(true);
            fetch(`${BASE_URL}/model/${marca}`)
                .then(res => res.json())
                .then(data => setModelos(data))
                .catch(() => setModelos([]))
                .finally(() => setLoadingModelos(false));
        } else {
            setModelos([]);
            setModelo("");
        }
    }, [marca]);

    // Filtrar actividades por servicio seleccionado
    const actividadesFiltradas = servicio
        ? actividades.filter((a: any) => String(a.nro_servicio) === String(servicio))
        : actividades;

    const agregarServicio = () => {
        if (servicio && !serviciosSeleccionados.find(s => String(s.nro_servicio) === String(servicio))) {
            const servicioSeleccionado = servicios.find(s => String(s.nro_servicio) === String(servicio));
            if (servicioSeleccionado) {
                setServiciosSeleccionados(prev => [...prev, servicioSeleccionado]);
                setServicio(""); // Limpiar el select
            }
        }
    };

    const quitarServicio = (nroServicio: string) => {
        setServiciosSeleccionados(prev => prev.filter(s => String(s.nro_servicio) !== String(nroServicio)));
        // También quitar actividades asociadas a este servicio
        setActividadesSeleccionadas(prev => prev.filter(a => String(a.nro_servicio) !== String(nroServicio)));
    };

    const agregarActividad = () => {
        if (actividad && !actividadesSeleccionadas.find(a => String(a.nro_correlativo) === String(actividad))) {
            const actividadSeleccionada = actividades.find(a => String(a.nro_correlativo) === String(actividad));
            if (actividadSeleccionada) {
                setActividadesSeleccionadas(prev => [...prev, actividadSeleccionada]);
                setActividad(""); // Limpiar el select
            }
        }
    };

    const quitarActividad = (nroCorrelativo: string) => {
        setActividadesSeleccionadas(prev => prev.filter(a => String(a.nro_correlativo) !== String(nroCorrelativo)));
    };

    return (
        <div className={styles.body}>
            <TopBar text="Registrar Plan de Mantenimiento" menu={true} />
            <div className={styles.content}>
                {loading && <div>Cargando datos...</div>}
                {error && <div style={{color: 'red'}}>{error}</div>}
                {!loading && !error && <>
                <div className={styles.sectionTitle}>INFORMACION DEL VEHICULO:</div>
                <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                        <span className={styles.label}>Marca:</span>
                        <select className={styles.select} value={marca} onChange={e => { setMarca(e.target.value); setModelo(""); }}>
                            <option value="">Seleccione</option>
                            {marcas.map((m: any) => (
                                <option key={m.cod_marca} value={m.cod_marca}>{m.nombre_marca}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.fieldGroup}>
                        <span className={styles.label}>Modelo:</span>
                        <select className={styles.select} value={modelo} onChange={e => setModelo(e.target.value)} disabled={!marca || loadingModelos}>
                            <option value="">{loadingModelos ? "Cargando..." : "Seleccione"}</option>
                            {modelos.map((m: any) => (
                                <option key={m.id_modelo || m.cod_modelo} value={m.id_modelo || m.cod_modelo}>{m.nombre || m.modelo}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                        <span className={styles.label}>Kilometraje:</span>
                        <input className={styles.input} type="number" min="0" value={kilometraje} onChange={e => setKilometraje(e.target.value)} placeholder="" />
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                        <span className={styles.label}>Nombre Plan Mantenimiento:</span>
                        <input className={styles.input} type="text" value={nombrePlan} onChange={e => setNombrePlan(e.target.value)} />
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                        <span className={styles.label}>Descripcion:</span>
                        <textarea className={styles.textarea} value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                        <span className={styles.label}>Agregar Servicios:</span>
                        <div className={styles.selectContainer}>
                            <select className={styles.select} value={servicio} onChange={e => setServicio(e.target.value)}>
                                <option value="">Seleccione</option>
                                {servicios.map((s: any) => (
                                    <option key={s.nro_servicio} value={s.nro_servicio}>{s.nombre_ser}</option>
                                ))}
                            </select>
                            <button 
                                type="button" 
                                className={styles.addButton} 
                                onClick={agregarServicio}
                                disabled={!servicio}
                            >
                                +
                            </button>
                        </div>
                        <div className={styles.selectedItems}>
                            {serviciosSeleccionados.map((s: any) => (
                                <div key={s.nro_servicio} className={styles.selectedItem}>
                                    <span>{s.nombre_ser}</span>
                                    <button 
                                        type="button" 
                                        className={styles.removeButton}
                                        onClick={() => quitarServicio(s.nro_servicio)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                        <span className={styles.label}>Agregar Actividades:</span>
                        <div className={styles.selectContainer}>
                            <select className={styles.select} value={actividad} onChange={e => setActividad(e.target.value)}>
                                <option value="">Seleccione</option>
                                {actividadesFiltradas.map((a: any) => (
                                    <option key={a.nro_correlativo} value={a.nro_correlativo}>{a.nombre}</option>
                                ))}
                            </select>
                            <button 
                                type="button" 
                                className={styles.addButton} 
                                onClick={agregarActividad}
                                disabled={!actividad}
                            >
                                +
                            </button>
                        </div>
                        <div className={styles.selectedItems}>
                            {actividadesSeleccionadas.map((a: any) => (
                                <div key={a.nro_correlativo} className={styles.selectedItem}>
                                    <span>{a.nombre}</span>
                                    <button 
                                        type="button" 
                                        className={styles.removeButton}
                                        onClick={() => quitarActividad(a.nro_correlativo)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <Button texto="Añadir" viewHeight={7} fuente={3} />
                </div>
                </>}
            </div>
        </div>
    );
};

export default RegistrarPlan; 