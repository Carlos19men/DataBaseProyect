import React, { useEffect, useState } from "react";
import MenuDespegable from "../../components/Menu Desplegable/MenuDesplegable";
import styles from "./OrdenServicio.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/button";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";

const OrdenServicio : React.FC = ({}) => {
    const [busqueda, setBusqueda] = React.useState<string>("");
    const [resultados, setResultados] = React.useState<any[]|any>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteOrderId, setDeleteOrderId] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    
    // Estados para el modal de actualizar
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateOrderId, setUpdateOrderId] = useState("");
    const [horaRealSalida, setHoraRealSalida] = useState("");
    const [fechaSalida, setFechaSalida] = useState("");
    const [justificacion, setJustificacion] = useState("");
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState("");
    const navigate = useNavigate();

    async function buscar(ID:string="") {
        const res = await fetch("http://localhost:1234/service-order/" + ID,
            {method:"GET",headers:{"Content-Type":"application/json"}})
          .then(res => res.json())
          .then(lista => (lista))
          .catch(err => ("Solicitud falló con: " + err));

        setResultados(res)
    }

    useEffect(() => {
        buscar();
    }, []);

    // Función para eliminar orden de servicio
    const handleDeleteOrder = async () => {
        setDeleteLoading(true);
        setDeleteError("");
        try {
            const response = await fetch(`http://localhost:1234/service-order/${deleteOrderId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                setDeleteError(errorData.message || 'Error al eliminar la orden');
            } else {
                setShowDeleteModal(false);
                setDeleteOrderId("");
                buscar(); // Refrescar la lista
                alert('Orden eliminada exitosamente');
            }
        } catch (error) {
            setDeleteError('Error al eliminar la orden');
        } finally {
            setDeleteLoading(false);
        }
    };

    // Función para actualizar orden de servicio
    const handleUpdateOrder = async () => {
        setUpdateLoading(true);
        setUpdateError("");
        try {
            const updateData = {
                cod_OS: updateOrderId,
                hora_real_salida: horaRealSalida,
                fecha_salida: fechaSalida,
                justificacion: justificacion
            };

            const response = await fetch(`http://localhost:1234/service-order/${updateOrderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setUpdateError(errorData.message || 'Error al actualizar la orden');
            } else {
                setShowUpdateModal(false);
                setUpdateOrderId("");
                setHoraRealSalida("");
                setFechaSalida("");
                setJustificacion("");
                buscar(); // Refrescar la lista
                alert('Orden actualizada exitosamente');
            }
        } catch (error) {
            setUpdateError('Error al actualizar la orden');
        } finally {
            setUpdateLoading(false);
        }
    };

    return (
        <div >
            <div className={styles.bar} >
                <MenuDespegable ></MenuDespegable> 
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <SearchBar etiqueta="" ejemplo="Buscar Orden de Servicio" viewWidth={70} viewHeight={8} value={busqueda} onSearchClick={() => { buscar(busqueda) }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setBusqueda(e.target.value)}}></SearchBar>
                </div>
            </div>
            <div className={styles.columnas}>
                <div className={styles.resultados}>
                    {typeof resultados === "string" ? (
                        <div>{resultados}</div>
                    ) : !Array.isArray(resultados) ? (
                        JSON.stringify(resultados, null, 2)
                        ) : (
                        resultados.map((item: any, idx: number) => (
                        <div className={styles.item} key={idx} onClick={() => navigate(`/ordenservicio-detalle/${item.cod_OS}`)} style={{cursor: 'pointer'}}>
                            <div style={{fontWeight: 700, fontSize: '2.2vh', marginBottom: '1vh'}}>Orden #{item.cod_OS}</div>
                            <div><strong>Código Vehículo:</strong> {item.codigo_vehiculo}</div>
                            <div><strong>RIF Establecimiento:</strong> {item.RIF_establecimiento}</div>
                            {item.persona_autorizada && <div><strong>Persona Autorizada:</strong> {item.persona_autorizada}</div>}
                        </div>
                        ))
                    )}
                </div> 
                <div className={styles.filtros}>
                    <div className={styles.subtitle}>Operaciones</div>
                    <Button texto="Crear Orden" viewHeight={5} onClick={() => navigate('/RegistrarOrdenServicio')} />
                    <Button texto="Actualizar Orden" viewHeight={5} onClick={() => setShowUpdateModal(true)} />
                    <Button texto="Eliminar Orden" viewHeight={5} onClick={() => setShowDeleteModal(true)} />
                </div>
            </div>
            
            {/* Modal para actualizar orden */}
            {showUpdateModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '3rem 2.5rem',
                        minWidth: '500px',
                        minHeight: '400px',
                        boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div style={{width: '100%', marginBottom: '2rem', textAlign: 'left'}}>
                            <span style={{fontWeight: 700, fontSize: '1.4rem'}}>Actualizar Orden de Servicio</span>
                        </div>
                        
                        {/* Campo Número de Orden */}
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '2rem', width: '100%'}}>
                            <span style={{fontWeight: 700, fontSize: '1.2rem', marginRight: '1.5rem', minWidth: '120px'}}>Número Orden:</span>
                            <TextBoxMU
                                value={updateOrderId}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdateOrderId(e.target.value)}
                                ejemplo="Ej: 1"
                                etiqueta=""
                                viewWidth={18}
                                viewHeight={5}
                            />
                        </div>

                        {/* Campo Hora Real de Salida */}
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '2rem', width: '100%'}}>
                            <span style={{fontWeight: 700, fontSize: '1.2rem', marginRight: '1.5rem', minWidth: '120px'}}>Hora Real Salida:</span>
                            <input
                                type="time"
                                value={horaRealSalida}
                                onChange={(e) => setHoraRealSalida(e.target.value)}
                                style={{
                                    padding: '0.5rem',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '1rem',
                                    width: '150px'
                                }}
                            />
                        </div>

                        {/* Campo Fecha de Salida */}
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '2rem', width: '100%'}}>
                            <span style={{fontWeight: 700, fontSize: '1.2rem', marginRight: '1.5rem', minWidth: '120px'}}>Fecha de Salida:</span>
                            <input
                                type="date"
                                value={fechaSalida}
                                onChange={(e) => setFechaSalida(e.target.value)}
                                style={{
                                    padding: '0.5rem',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '1rem',
                                    width: '150px'
                                }}
                            />
                        </div>

                        {/* Campo Justificación */}
                        <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '2rem', width: '100%'}}>
                            <span style={{fontWeight: 700, fontSize: '1.2rem', marginRight: '1.5rem', minWidth: '120px', marginTop: '0.5rem'}}>Justificación:</span>
                            <textarea
                                value={justificacion}
                                onChange={(e) => setJustificacion(e.target.value)}
                                placeholder="Ingrese la justificación..."
                                style={{
                                    padding: '0.5rem',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '1rem',
                                    width: '250px',
                                    minHeight: '80px',
                                    resize: 'vertical'
                                }}
                            />
                        </div>

                        <Button 
                            texto={updateLoading ? "Actualizando..." : "Actualizar"} 
                            viewHeight={5} 
                            onClick={handleUpdateOrder} 
                            disabled={updateLoading || !updateOrderId} 
                        />
                        {updateError && <div style={{color: 'red', marginTop: '1.5rem'}}>{updateError}</div>}
                        <button 
                            onClick={() => {
                                setShowUpdateModal(false);
                                setUpdateOrderId("");
                                setHoraRealSalida("");
                                setFechaSalida("");
                                setJustificacion("");
                                setUpdateError("");
                            }} 
                            style={{
                                marginTop: '1.5rem', 
                                background: 'none', 
                                border: 'none', 
                                color: '#007bff', 
                                cursor: 'pointer', 
                                fontSize: '1rem'
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para eliminar orden */}
            {showDeleteModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '3rem 2.5rem',
                        minWidth: '420px',
                        minHeight: '220px',
                        boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div style={{width: '100%', marginBottom: '2rem', textAlign: 'left'}}>
                            <span style={{fontWeight: 700, fontSize: '1.4rem'}}>Número Orden</span>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '2rem'}}>
                            <span style={{fontWeight: 700, fontSize: '1.4rem', marginRight: '1.5rem'}}>Número Orden</span>
                            <TextBoxMU
                                value={deleteOrderId}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeleteOrderId(e.target.value)}
                                ejemplo="Ej: 1"
                                etiqueta=""
                                viewWidth={18}
                                viewHeight={5}
                            />
                        </div>
                        <Button texto={deleteLoading ? "Eliminando..." : "Eliminar"} viewHeight={5} onClick={handleDeleteOrder} disabled={deleteLoading || !deleteOrderId} />
                        {deleteError && <div style={{color: 'red', marginTop: '1.5rem'}}>{deleteError}</div>}
                        <button onClick={() => setShowDeleteModal(false)} style={{marginTop: '1.5rem', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '1rem'}}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrdenServicio; 