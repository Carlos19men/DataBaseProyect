import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuDespegable from "../../components/Menu Desplegable/MenuDespegable";
import styles from './Detalle.module.css';
import TopBar from '../../components/TopBar/TopBar';
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';


const ModeloDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { codigo, cod_marca } = location.state || {};
  
  const [modeloData, setModeloData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingData, setEditingData] = useState({
    modelo: '',
    peso: '',
    nro_puestos: '',
    octanaje: '',
    tipo_refrigerante: '',
    descripcion: '',
    aceite_motor: '',
    aceite_caja: ''
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
    const fetchModeloData = async () => {
      if (!codigo || !cod_marca) {
        setError("No se proporcionaron los códigos del modelo y marca");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        
        // Fetch del modelo específico usando el código de marca y modelo
        const response = await fetch(`http://localhost:1234/model/${cod_marca}/${codigo}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setModeloData(data);
      } catch (err) {
        console.error("Error fetching modelo data:", err);
        setError("No se pudo cargar la información del modelo");
      } finally {
        setLoading(false);
      }
    };

    fetchModeloData();
  }, [codigo]);

  if (loading) {
    return (
      <div>
        <TopBar text='Detalles del Modelo' menu={true} />
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Cargando información del modelo...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !modeloData) {
    return (
      <div>
        <TopBar text='Detalles del Modelo' menu={true} />
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Error: {error || "Modelo no encontrado"}</h3>
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
      modelo: modeloData?.modelo || '',
      peso: modeloData?.peso || '',
      nro_puestos: modeloData?.nro_puestos || '',
      octanaje: modeloData?.octanaje || '',
      tipo_refrigerante: modeloData?.tipo_refrigerante || '',
      descripcion: modeloData?.descripcion || '',
      aceite_motor: modeloData?.aceite_motor || '',
      aceite_caja: modeloData?.aceite_caja || ''
    });
    setShowEditModal(true);
  };
  const handleDelete = () => setShowDeleteModal(true);
  const handleUpdateModelo = async () => {
    if (!editingData.modelo.trim() || !editingData.peso.trim() || !editingData.nro_puestos.trim()) {
      setActionMessage("Modelo, peso y número de puestos son obligatorios");
      return;
    }
    setLoadingAction(true);
    try {
      const response = await fetch(`http://localhost:1234/model`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_marca: modeloData?.cod_marca,
          id_modelo: modeloData?.cod_modelo,
          nombre: editingData.modelo,
          peso_str: editingData.peso,
          nro_puesto_str: editingData.nro_puestos,
          octanaje: editingData.octanaje,
          tipo_refrigerante: editingData.tipo_refrigerante,
          descripcion: editingData.descripcion,
          aceite_motor: editingData.aceite_motor,
          aceite_caja: editingData.aceite_caja
        })
      });
      if (response.ok) {
        setActionMessage("Modelo actualizado exitosamente");
        setShowEditModal(false);
        window.location.reload();
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al actualizar el modelo");
      }
    } catch (err) {
      setActionMessage("Error de conexión");
    } finally {
      setLoadingAction(false);
    }
  };
  const handleDeleteModelo = async () => {
    setLoadingAction(true);
    try {
      const response = await fetch(`http://localhost:1234/model/${modeloData?.cod_marca}/${modeloData?.cod_modelo}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setActionMessage("Modelo eliminado exitosamente");
        setShowDeleteModal(false);
        navigate('/Search');
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al eliminar el modelo");
      }
    } catch (err) {
      setActionMessage("Error de conexión");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div>
      <TopBar text='Detalles del Modelo' menu={true} />
      {/* Botón flotante de regreso */}
      {!menuAbierto && (
        <button className={styles.backFab} onClick={() => navigate('/Search')}>
          ←
        </button>
      )}
      <div className={styles.container}>
        {/* Botones de acción */}
        <div className={styles.actionButtons}>
          <button className={styles.editButton} onClick={handleEdit}>✏️ Editar Modelo</button>
          <button className={styles.deleteButton} onClick={handleDelete}>🗑️ Eliminar Modelo</button>
        </div>
        {/* Cabecera con información detallada */}
        <div className={styles.detailCard}>
          <div className={styles.clientHeader}>
            <h2>Modelo: {modeloData?.modelo || "Nombre no disponible"}</h2>
            
            <div className={styles.clientInfoGrid}>
              <div className={styles.infoSection}>
                <h3>Información del Modelo</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Código:</span>
                  <span className={styles.value}>{modeloData?.cod_modelo || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Nombre:</span>
                  <span className={styles.value}>{modeloData?.modelo || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Marca:</span>
                  <span className={styles.value}>{modeloData?.marca || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Peso:</span>
                  <span className={styles.value}>{modeloData?.peso ? `${modeloData.peso} kg` : "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Número de puestos:</span>
                  <span className={styles.value}>{modeloData?.nro_puestos || "No disponible"}</span>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Especificaciones Técnicas</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Octanaje:</span>
                  <span className={styles.value}>{modeloData?.octanaje || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Tipo de refrigerante:</span>
                  <span className={styles.value}>{modeloData?.tipo_refrigerante || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Descripción:</span>
                  <span className={styles.value}>{modeloData?.descripcion || "No disponible"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de aceites */}
          <div className={styles.tableSection}>
            <h3>Especificaciones de Aceites</h3>
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
                    <td>{modeloData?.aceite_motor || "No especificado"}</td>
                    <td>
                      <span style={{ 
                        color: modeloData?.aceite_motor ? '#2ecc40' : '#e74c3c',
                        fontWeight: 600 
                      }}>
                        {modeloData?.aceite_motor ? "Especificado" : "No especificado"}
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
                    <td>{modeloData?.aceite_caja || "No especificado"}</td>
                    <td>
                      <span style={{ 
                        color: modeloData?.aceite_caja ? '#2ecc40' : '#e74c3c',
                        fontWeight: 600 
                      }}>
                        {modeloData?.aceite_caja ? "Especificado" : "No especificado"}
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
            <h3>Editar Modelo</h3>
            <div className={styles.formGroup}>
              <label>Nombre:</label>
              <input type="text" value={editingData.modelo} onChange={e => setEditingData({ ...editingData, modelo: e.target.value })} className={styles.modalInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Peso:</label>
              <input type="number" value={editingData.peso} onChange={e => setEditingData({ ...editingData, peso: e.target.value })} className={styles.modalInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Número de puestos:</label>
              <input type="number" value={editingData.nro_puestos} onChange={e => setEditingData({ ...editingData, nro_puestos: e.target.value })} className={styles.modalInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Octanaje:</label>
              <input type="text" value={editingData.octanaje} onChange={e => setEditingData({ ...editingData, octanaje: e.target.value })} className={styles.modalInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Tipo de refrigerante:</label>
              <input type="text" value={editingData.tipo_refrigerante} onChange={e => setEditingData({ ...editingData, tipo_refrigerante: e.target.value })} className={styles.modalInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Descripción:</label>
              <input type="text" value={editingData.descripcion} onChange={e => setEditingData({ ...editingData, descripcion: e.target.value })} className={styles.modalInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Aceite Motor:</label>
              <input type="text" value={editingData.aceite_motor} onChange={e => setEditingData({ ...editingData, aceite_motor: e.target.value })} className={styles.modalInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Aceite Caja:</label>
              <input type="text" value={editingData.aceite_caja} onChange={e => setEditingData({ ...editingData, aceite_caja: e.target.value })} className={styles.modalInput} />
            </div>
            {actionMessage && <div className={styles.message}>{actionMessage}</div>}
            <div className={styles.modalButtons}>
              <button onClick={handleUpdateModelo} disabled={loadingAction} className={styles.confirmButton}>{loadingAction ? "Actualizando..." : "Actualizar"}</button>
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
            <p>¿Está seguro que desea eliminar el modelo {modeloData?.modelo}?</p>
            <p>Esta acción no se puede deshacer.</p>
            {actionMessage && <div className={styles.message}>{actionMessage}</div>}
            <div className={styles.modalButtons}>
              <button onClick={handleDeleteModelo} disabled={loadingAction} className={styles.deleteConfirmButton}>{loadingAction ? "Eliminando..." : "Eliminar"}</button>
              <button onClick={() => setShowDeleteModal(false)} className={styles.cancelButton}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeloDetalle; 