import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuDespegable from "../../components/Menu Desplegable/MenuDespegable";
import styles from './Detalle.module.css';
import TopBar from '../../components/TopBar/TopBar';
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';



const MarcaDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { codigo } = location.state || {};
  
  const [marcaData, setMarcaData] = useState<any>(null);
  const [modelosData, setModelosData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingData, setEditingData] = useState({ nombre: '' });
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
    const fetchMarcaData = async () => {
      if (!codigo) {
        setError("No se proporcionó el código de la marca");
        setLoading(false);
        return;
      }

      // Validar que el código sea un número válido
      const codigoNumero = parseInt(codigo);
      if (isNaN(codigoNumero)) {
        setError("El código de la marca no es válido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        console.log("Fetching data for marca with codigo:", codigo);
        console.log("Type of codigo:", typeof codigo);
        console.log("Parsed codigo:", codigoNumero);
        
        // Fetch de la marca específica usando el código
        const marcaResponse = await fetch(`http://localhost:1234/brand/${codigoNumero}`);
        
        if (!marcaResponse.ok) {
          throw new Error(`Error ${marcaResponse.status}: ${marcaResponse.statusText}`);
        }
        
        const marcaData = await marcaResponse.json();
        console.log("Marca data:", marcaData);
        setMarcaData(marcaData);

        // Fetch de los modelos asociados a esta marca
        const modelosResponse = await fetch(`http://localhost:1234/model/${codigoNumero}`);
        
        console.log("Response status:", modelosResponse.status);
        console.log("Response ok:", modelosResponse.ok);
        
        if (modelosResponse.ok) {
          const modelosData = await modelosResponse.json();
          console.log("Modelos data:", modelosData);
          console.log("Modelos data length:", modelosData.length);
          console.log("First modelo:", modelosData[0]);
          setModelosData(Array.isArray(modelosData) ? modelosData : []);
        } else {
          console.warn("No se pudieron cargar los modelos de la marca");
          console.warn("Status:", modelosResponse.status);
          console.warn("Status text:", modelosResponse.statusText);
          setModelosData([]);
        }
      } catch (err) {
        console.error("Error fetching marca data:", err);
        setError("No se pudo cargar la información de la marca");
      } finally {
        setLoading(false);
      }
    };

    fetchMarcaData();
  }, [codigo]);

  if (loading) {
    return (
      <div>
        <TopBar text='Detalles de la Marca' menu={true} />
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Cargando información de la marca...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !marcaData) {
    return (
      <div>
        <TopBar text='Detalles de la Marca' menu={true} />
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Error: {error || "Marca no encontrada"}</h3>
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
    setEditingData({ nombre: marcaData?.nombre_marca || '' });
    setShowEditModal(true);
  };
  const handleDelete = () => setShowDeleteModal(true);
  const handleUpdateMarca = async () => {
    if (!editingData.nombre.trim()) {
      setActionMessage("El nombre es obligatorio");
      return;
    }
    setLoadingAction(true);
    try {
      const response = await fetch(`http://localhost:1234/brand/`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: marcaData?.cod_marca, name: editingData.nombre })
      });
      if (response.ok) {
        setActionMessage("Marca actualizada exitosamente");
        setShowEditModal(false);
        window.location.reload();
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al actualizar la marca");
      }
    } catch (err) {
      setActionMessage("Error de conexión");
    } finally {
      setLoadingAction(false);
    }
  };
  const handleDeleteMarca = async () => {
    setLoadingAction(true);
    try {
      const response = await fetch(`http://localhost:1234/brand/${marcaData?.cod_marca}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setActionMessage("Marca eliminada exitosamente");
        setShowDeleteModal(false);
        navigate('/Search');
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al eliminar la marca");
      }
    } catch (err) {
      setActionMessage("Error de conexión");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div>
      <TopBar text='Detalles de la Marca' menu={true} />
      {/* Botón flotante de regreso */}
      {!menuAbierto && (
        <button className={styles.backFab} onClick={() => navigate('/Search')}>
          ←
        </button>
      )}
      <div className={styles.container}>
        {/* Botones de acción */}
        <div className={styles.actionButtons}>
          <button className={styles.editButton} onClick={handleEdit}>✏️ Editar Marca</button>
          <button className={styles.deleteButton} onClick={handleDelete}>🗑️ Eliminar Marca</button>
        </div>
        {/* Cabecera con información detallada */}
        <div className={styles.detailCard}>
          <div className={styles.clientHeader}>
            <h2>Marca: {marcaData?.nombre_marca || "Nombre no disponible"}</h2>
            
            <div className={styles.clientInfoGrid}>
              <div className={styles.infoSection}>
                <h3>Información de la Marca</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Código:</span>
                  <span className={styles.value}>{marcaData?.cod_marca || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Nombre:</span>
                  <span className={styles.value}>{marcaData?.nombre_marca || "No disponible"}</span>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Estadísticas</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Modelos disponibles:</span>
                  <span className={styles.value}>{modelosData.length} modelos</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Vehículos registrados:</span>
                  <span className={styles.value}>Por implementar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de modelos de la marca */}
          <div className={styles.tableSection}>
            <h3>Modelos de esta Marca</h3>
            <div className={styles.tableContainer}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Modelo</th>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {modelosData.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>No hay modelos registrados para esta marca</p>
                        <button className={styles.actionButton}>
                          Agregar modelo
                        </button>
                      </td>
                    </tr>
                  ) : (
                    modelosData.map((modelo, index) => (
                      <tr key={index}>
                        <td>{modelo.modelo || "Sin nombre"}</td>
                        <td>{modelo.cod_modelo || "Sin código"}</td>
                        <td>{modelo.descripcion || "Sin descripción"}</td>
                        <td>
                          <button 
                            className={styles.actionButton}
                            onClick={() => navigate('/modelo-detalle', { state: { codigo: modelo.cod_modelo, cod_marca: modelo.cod_marca } })}
                          >
                            Ver detalles
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
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
            <h3>Editar Marca</h3>
            <div className={styles.formGroup}>
              <label>Nombre:</label>
              <input type="text" value={editingData.nombre} onChange={e => setEditingData({ ...editingData, nombre: e.target.value })} className={styles.modalInput} />
            </div>
            {actionMessage && <div className={styles.message}>{actionMessage}</div>}
            <div className={styles.modalButtons}>
              <button onClick={handleUpdateMarca} disabled={loadingAction} className={styles.confirmButton}>{loadingAction ? "Actualizando..." : "Actualizar"}</button>
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
            <p>¿Está seguro que desea eliminar la marca {marcaData?.nombre_marca}?</p>
            <p>Esta acción no se puede deshacer.</p>
            {actionMessage && <div className={styles.message}>{actionMessage}</div>}
            <div className={styles.modalButtons}>
              <button onClick={handleDeleteMarca} disabled={loadingAction} className={styles.deleteConfirmButton}>{loadingAction ? "Eliminando..." : "Eliminar"}</button>
              <button onClick={() => setShowDeleteModal(false)} className={styles.cancelButton}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarcaDetalle; 