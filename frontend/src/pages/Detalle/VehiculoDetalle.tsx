import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuDespegable from "../../components/Menu Desplegable/MenuDespegable";
import styles from './Detalle.module.css';
import TopBar from '../../components/TopBar/TopBar';
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';

const VehiculoDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { placa } = location.state || {};
  
  const [vehiculoData, setVehiculoData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingData, setEditingData] = useState({
    kilometraje: '',
    meses_uso: '',
    aceite_utilizado_motor: '',
    aceite_utilizado_caja: '',
    resumen_mantenimiento: ''
  });
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
    const fetchVehiculoData = async () => {
      if (!placa) {
        setError("No se proporcionó la placa del vehículo");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        
        // Fetch del vehículo específico usando la placa
        const response = await fetch(`http://localhost:1234/vehicles/${placa}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setVehiculoData(data);
      } catch (err) {
        console.error("Error fetching vehiculo data:", err);
        setError("No se pudo cargar la información del vehículo");
      } finally {
        setLoading(false);
      }
    };

    fetchVehiculoData();
  }, [placa]);

  if (loading) {
    return (
      <div>
        <TopBar text='Detalles del vehículo' menu={true} />
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Cargando información del vehículo...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !vehiculoData) {
    return (
      <div>
        <TopBar text='Detalles del vehículo' menu={true} />
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Error: {error || "Vehículo no encontrado"}</h3>
              <button 
                onClick={() => navigate('/Search')} 
                className={styles.actionButton}
                style={{ marginTop: '1rem' }}
              >
                Volver a búsqueda
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setEditingData({
      kilometraje: vehiculoData?.kilometraje || '',
      meses_uso: vehiculoData?.meses_uso || '',
      aceite_utilizado_motor: vehiculoData?.aceite_utilizado_motor || '',
      aceite_utilizado_caja: vehiculoData?.aceite_utilizado_caja || '',
      resumen_mantenimiento: vehiculoData?.resumen_mantenimiento || ''
    });
    setShowEditModal(true);
  };
  const handleDelete = () => setShowDeleteModal(true);
  const handleUpdateVehiculo = async () => {
    if (!editingData.kilometraje.trim() || !editingData.meses_uso.trim()) {
      setActionMessage("Kilometraje y meses de uso son obligatorios");
      return;
    }
    setLoadingAction(true);
    try {
      const response = await fetch(`http://localhost:1234/vehicles`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plate: vehiculoData?.placa,
          kilometraje: editingData.kilometraje,
          meses_uso: editingData.meses_uso,
          aceite_utilizado_motor: editingData.aceite_utilizado_motor,
          aceite_utilizado_caja: editingData.aceite_utilizado_caja,
          resumen_mantenimiento: editingData.resumen_mantenimiento
        })
      });
      if (response.ok) {
        setActionMessage("Vehículo actualizado exitosamente");
        setShowEditModal(false);
        window.location.reload();
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al actualizar el vehículo");
      }
    } catch (err) {
      setActionMessage("Error de conexión");
    } finally {
      setLoadingAction(false);
    }
  };
  const handleDeleteVehiculo = async () => {
    setLoadingAction(true);
    try {
      const response = await fetch(`http://localhost:1234/vehicles`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plate: vehiculoData?.placa })
      });
      if (response.ok) {
        setActionMessage("Vehículo eliminado exitosamente");
        setShowDeleteModal(false);
        navigate('/Search');
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al eliminar el vehículo");
      }
    } catch (err) {
      setActionMessage("Error de conexión");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div>
      <TopBar text='Detalles del vehículo' menu={true} />
      {/* Botón flotante de regreso */}
      {!menuAbierto && (
        <button className={styles.backFab} onClick={() => navigate('/Search')}>
          ←
        </button>
      )}
      <div className={styles.container}>
        {/* Botones de acción */}
        <div className={styles.actionButtons}>
          <button className={styles.editButton} onClick={handleEdit}>✏️ Editar Vehículo</button>
          <button className={styles.deleteButton} onClick={handleDelete}>🗑️ Eliminar Vehículo</button>
        </div>
        {/* Cabecera con información detallada */}
        <div className={styles.detailCard}>
          <div className={styles.clientHeader}>
            <h2>Vehículo: {vehiculoData?.placa || "Placa no disponible"}</h2>
            
            <div className={styles.clientInfoGrid}>
              <div className={styles.infoSection}>
                <h3>Información del Vehículo</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Placa:</span>
                  <span className={styles.value}>{vehiculoData?.placa || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Marca:</span>
                  <span className={styles.value}>{vehiculoData?.nombre_marca || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Modelo:</span>
                  <span className={styles.value}>{vehiculoData?.nombre || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Kilometraje:</span>
                  <span className={styles.value}>{vehiculoData?.kilometraje ? `${vehiculoData.kilometraje} km` : "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Meses de uso:</span>
                  <span className={styles.value}>{vehiculoData?.meses_uso ? `${vehiculoData.meses_uso} meses` : "No disponible"}</span>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Información del Dueño</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Nombre:</span>
                  <span className={styles.value}>{vehiculoData?.nombre_cli || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Apellido:</span>
                  <span className={styles.value}>{vehiculoData?.apellido_cli || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Cédula:</span>
                  <span className={styles.value}>{vehiculoData?.CI_cliente || "No disponible"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de mantenimiento */}
          <div className={styles.tableSection}>
            <h3>Información de Mantenimiento</h3>
            <div className={styles.tableContainer}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Componente</th>
                    <th>Especificación</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Aceite del Motor</td>
                    <td>{vehiculoData?.aceite_utilizado_motor || "No especificado"}</td>
                    <td>
                      <span style={{ 
                        color: vehiculoData?.aceite_utilizado_motor ? '#2ecc40' : '#e74c3c',
                        fontWeight: 600 
                      }}>
                        {vehiculoData?.aceite_utilizado_motor ? "Especificado" : "No especificado"}
                      </span>
                    </td>
                    <td>
                      <button className={styles.actionButton}>
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Aceite de la Caja</td>
                    <td>{vehiculoData?.aceite_utilizado_caja || "No especificado"}</td>
                    <td>
                      <span style={{ 
                        color: vehiculoData?.aceite_utilizado_caja ? '#2ecc40' : '#e74c3c',
                        fontWeight: 600 
                      }}>
                        {vehiculoData?.aceite_utilizado_caja ? "Especificado" : "No especificado"}
                      </span>
                    </td>
                    <td>
                      <button className={styles.actionButton}>
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Resumen de Mantenimiento</td>
                    <td>{vehiculoData?.resumen_mantenimiento || "No disponible"}</td>
                    <td>
                      <span style={{ 
                        color: vehiculoData?.resumen_mantenimiento ? '#2ecc40' : '#e74c3c',
                        fontWeight: 600 
                      }}>
                        {vehiculoData?.resumen_mantenimiento ? "Disponible" : "No disponible"}
                      </span>
                    </td>
                    <td>
                      <button className={styles.actionButton}>
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Modal de Edición */}
      {showEditModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Editar Vehículo</h3>
            <div className={styles.formGroup}>
              <label>Kilometraje:</label>
              <input type="number" value={editingData.kilometraje} onChange={e => setEditingData({ ...editingData, kilometraje: e.target.value })} className={styles.modalInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Meses de uso:</label>
              <input type="number" value={editingData.meses_uso} onChange={e => setEditingData({ ...editingData, meses_uso: e.target.value })} className={styles.modalInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Aceite Motor:</label>
              <input type="text" value={editingData.aceite_utilizado_motor} onChange={e => setEditingData({ ...editingData, aceite_utilizado_motor: e.target.value })} className={styles.modalInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Aceite Caja:</label>
              <input type="text" value={editingData.aceite_utilizado_caja} onChange={e => setEditingData({ ...editingData, aceite_utilizado_caja: e.target.value })} className={styles.modalInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Resumen Mantenimiento:</label>
              <input type="text" value={editingData.resumen_mantenimiento} onChange={e => setEditingData({ ...editingData, resumen_mantenimiento: e.target.value })} className={styles.modalInput} />
            </div>
            {actionMessage && <div className={styles.message}>{actionMessage}</div>}
            <div className={styles.modalButtons}>
              <button onClick={handleUpdateVehiculo} disabled={loadingAction} className={styles.confirmButton}>{loadingAction ? "Actualizando..." : "Actualizar"}</button>
              <button onClick={() => setShowEditModal(false)} className={styles.cancelButton}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de Eliminación */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Confirmar Eliminación</h3>
            <p>¿Está seguro que desea eliminar el vehículo {vehiculoData?.placa}?</p>
            <p>Esta acción no se puede deshacer.</p>
            {actionMessage && <div className={styles.message}>{actionMessage}</div>}
            <div className={styles.modalButtons}>
              <button onClick={handleDeleteVehiculo} disabled={loadingAction} className={styles.deleteConfirmButton}>{loadingAction ? "Eliminando..." : "Eliminar"}</button>
              <button onClick={() => setShowDeleteModal(false)} className={styles.cancelButton}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiculoDetalle; 