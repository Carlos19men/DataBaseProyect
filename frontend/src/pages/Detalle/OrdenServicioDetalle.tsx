import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MenuDespegable from "../../components/Menu Desplegable/MenuDesplegable";
import styles from './Detalle.module.css';
import TopBar from '../../components/TopBar/TopBar';
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';

const OrdenServicioDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const cod_OS = params.cod_OS;

  const [ordenData, setOrdenData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [creatingInvoice, setCreatingInvoice] = useState<boolean>(false);
  const [facturaExistente, setFacturaExistente] = useState<any>(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  
  useEffect(() => {
    const checkMenuState = () => {
      const menuState = localStorage.getItem('menuAbierto') === 'true';
      setMenuAbierto(menuState);
    };
    
    // Verificar estado inicial
    checkMenuState();
    
    // Escuchar cambios en localStorage
    const handleStorageChange = () => checkMenuState();
    window.addEventListener('storage', handleStorageChange);
    
    // Verificar cada 100ms para cambios locales
    const interval = setInterval(checkMenuState, 100);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const fetchOrdenData = async () => {
      if (!cod_OS) {
        setError("No se proporcionó el código de la orden de servicio");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError("");
        // Fetch de la orden de servicio específica
        const response = await fetch(`http://localhost:1234/service-order/${cod_OS}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setOrdenData(data);
      } catch (err) {
        setError("No se pudo cargar la información de la orden de servicio");
      } finally {
        setLoading(false);
      }
    };
    fetchOrdenData();

    // Verificar si ya existe una factura para esta orden de servicio
    const fetchFactura = async () => {
      if (!cod_OS) return;
      try {
        const res = await fetch(`http://localhost:1234/invoice/factura/${cod_OS}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setFacturaExistente(data[0]);
          } else {
            setFacturaExistente(null);
          }
        } else {
          setFacturaExistente(null);
        }
      } catch {
        setFacturaExistente(null);
      }
    };
    fetchFactura();
  }, [cod_OS]);

  const handleCreateInvoice = async () => {
    if (!cod_OS) return;
    
    setCreatingInvoice(true);
    try {
      const response = await fetch(`http://localhost:1234/invoice/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cod_OS: cod_OS
          // Puedes incluir iva y fecha_emision si lo deseas
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear la factura');
      }

      const result = await response.json();
      alert(`Factura creada exitosamente.`);
      
      // Redirigir a la página de visualización de factura usando cod_OS
      navigate(`/Factura?cod_OS=${cod_OS}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear la factura';
      alert(`Error: ${errorMessage}`);
    } finally {
      setCreatingInvoice(false);
    }
  };

  const handleVerificarFactura = () => {
    console.log('Redirigiendo a factura de orden:', cod_OS);
    navigate(`/Factura?cod_OS=${cod_OS}`);
  };

  const handleDelete = () => setShowDeleteModal(true);
  const handleDeleteOrden = async () => {
    setLoadingAction(true);
    try {
      const response = await fetch(`http://localhost:1234/service-order/${cod_OS}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setActionMessage("Orden de servicio eliminada exitosamente");
        setShowDeleteModal(false);
        navigate('/Search');
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al eliminar la orden de servicio");
      }
    } catch (err) {
      setActionMessage("Error de conexión");
    } finally {
      setLoadingAction(false);
    }
  };

  if (loading) {
    return (
      <div>
        <TopBar text='Detalles de Orden de Servicio' menu={true} />
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Cargando información de la orden de servicio...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !ordenData) {
    return (
      <div>
        <TopBar text='Detalles de Orden de Servicio' menu={true} />
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Error: {error || "Orden de servicio no encontrada"}</h3>
              <button 
                onClick={() => navigate('/OrdenesServicio')} 
                className={styles.actionButton}
                style={{ marginTop: '1rem' }}
              >
                Volver a listado
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar todos los campos relevantes de la orden de servicio
  return (
    <div>
      <TopBar text='Detalles de Orden de Servicio' menu={true} />
      {/* Botón flotante de regreso */}
      {!menuAbierto && (
        <button className={styles.backFab} onClick={() => navigate('/Search')}>
          ←
        </button>
      )}
      <div className={styles.container}>
        {/* Botón de eliminar */}
        <div className={styles.actionButtons}>
          <button className={styles.deleteButton} onClick={handleDelete}>🗑️ Eliminar Orden</button>
        </div>
        <div className={styles.detailCard}>
          <div className={styles.clientHeader}>
            <h2>Orden #{ordenData.cod_OS}</h2>
            <div className={styles.clientInfoGrid}>
              <div className={styles.infoSection}>
                <h3>Datos Generales</h3>
                <div className={styles.infoRow}><span className={styles.label}>Código Vehículo:</span> <span className={styles.value}>{ordenData.codigo_vehiculo}</span></div>
                <div className={styles.infoRow}><span className={styles.label}>RIF Establecimiento:</span> <span className={styles.value}>{ordenData.RIF_establecimiento}</span></div>
                <div className={styles.infoRow}><span className={styles.label}>Fecha Entrada:</span> <span className={styles.value}>{ordenData.fecha_entrada ? new Date(ordenData.fecha_entrada).toLocaleDateString('es-VE') : 'No disponible'}</span></div>
                <div className={styles.infoRow}><span className={styles.label}>Hora Entrada:</span> <span className={styles.value}>{ordenData.hora_entrada ? new Date(ordenData.hora_entrada).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }) : 'No disponible'}</span></div>
                <div className={styles.infoRow}><span className={styles.label}>Hora Estimada Salida:</span> <span className={styles.value}>{ordenData.hora_estimada_salida ? new Date(ordenData.hora_estimada_salida).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }) : 'No disponible'}</span></div>
                {ordenData.hora_real_salida && (
                  <div className={styles.infoRow}><span className={styles.label}>Hora Real Salida:</span> <span className={styles.value}>{new Date(ordenData.hora_real_salida).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}</span></div>
                )}
                {ordenData.fecha_salida && (
                  <div className={styles.infoRow}><span className={styles.label}>Fecha Salida:</span> <span className={styles.value}>{new Date(ordenData.fecha_salida).toLocaleDateString('es-VE')}</span></div>
                )}
                <div className={styles.infoRow}><span className={styles.label}>Persona Autorizada:</span> <span className={styles.value}>{ordenData.persona_autorizada || 'No disponible'}</span></div>
                {ordenData.justificacion && (
                  <div className={styles.infoRow}><span className={styles.label}>Justificación:</span> <span className={styles.value}>{ordenData.justificacion}</span></div>
                )}
              </div>
            </div>
          </div>
          
          {/* Botón para crear factura */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '2rem', 
            padding: '1rem',
            borderTop: '1px solid #e0e0e0'
          }}>
            {facturaExistente ? (
              <button
                onClick={handleVerificarFactura}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Verificar Factura
              </button>
            ) : (
              <button
                onClick={handleCreateInvoice}
                disabled={creatingInvoice}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: creatingInvoice ? 'not-allowed' : 'pointer',
                  opacity: creatingInvoice ? 0.7 : 1,
                  transition: 'all 0.3s ease'
                }}
              >
                {creatingInvoice ? 'Creando Factura...' : 'Crear Factura'}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Modal de Eliminación */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Confirmar Eliminación</h3>
            <p>¿Está seguro que desea eliminar la orden de servicio #{ordenData?.cod_OS}?</p>
            <p>Esta acción no se puede deshacer.</p>
            {actionMessage && <div className={styles.message}>{actionMessage}</div>}
            <div className={styles.modalButtons}>
              <button onClick={handleDeleteOrden} disabled={loadingAction} className={styles.deleteConfirmButton}>{loadingAction ? "Eliminando..." : "Eliminar"}</button>
              <button onClick={() => setShowDeleteModal(false)} className={styles.cancelButton}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdenServicioDetalle; 