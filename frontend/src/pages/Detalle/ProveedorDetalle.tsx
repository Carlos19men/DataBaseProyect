import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuDespegable from "../../components/Menu Desplegable/MenuDesplegable";
import styles from './Detalle.module.css';
import TopBar from '../../components/TopBar/TopBar';
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';

const ProveedorDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  console.log("=== DEBUG PROVEEDOR DETALLE ===");
  console.log("Location state completo:", location.state);
  console.log("URL actual:", window.location.href);
  
  const { proveedor, rif } = location.state || {};
  
  // Extraer RIF de diferentes formatos posibles
  const rifValue = rif || proveedor?.RIF || location.state?.RIF || proveedor?.rif || location.state?.rif;
  
  console.log("Proveedor object:", proveedor);
  console.log("RIF directo:", rif);
  console.log("RIF extraído:", rifValue);
  
  const [proveedorData, setProveedorData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingData, setEditingData] = useState({
    razonSo: "",
    direccion: "",
    local_: "",
    telefono: "",
    persona_contacto: ""
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
    const fetchProveedorData = async () => {
      console.log("=== DEBUG PROVEEDOR DETALLE ===");
      console.log("RIF recibido:", rifValue);
      console.log("Location state completo:", location.state);
      console.log("Proveedor object:", proveedor);
      console.log("RIF directo:", rif);
      console.log("URL actual:", window.location.href);
      
      if (!rifValue) {
        console.log("ERROR: No se encontró RIF válido");
        setError("No se proporcionó el RIF del proveedor");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        
        const url = `http://localhost:1234/suppliers/${rifValue}`;
        console.log("Haciendo fetch a:", url);
        
        // Fetch del proveedor específico usando el RIF
        const response = await fetch(`http://localhost:1234/suppliers/${rif}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.log("Error response:", errorText);
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Datos del proveedor recibidos:", data);
        setProveedorData(data);
      } catch (err) {
        console.error("Error completo:", err);
        setError("No se pudo cargar la información del proveedor");
      } finally {
        setLoading(false);
      }
    };

    fetchProveedorData();
  }, [rifValue]);

  if (loading) {
    return (
      <div>
        <TopBar text='Detalles del Proveedor' menu={true} />
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Cargando información del proveedor...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !proveedorData) {
    return (
      <div>
        <TopBar text='Detalles del Proveedor' menu={true} />
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Error: {error || "Proveedor no encontrado"}</h3>
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px', textAlign: 'left' }}>
                <h4>Información de Depuración:</h4>
                <p><strong>RIF recibido:</strong> {rifValue || "No disponible"}</p>
                <p><strong>Location state:</strong> {JSON.stringify(location.state, null, 2)}</p>
                <p><strong>Proveedor object:</strong> {JSON.stringify(proveedor, null, 2)}</p>
                <p><strong>RIF directo:</strong> {rif || "No disponible"}</p>
              </div>
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
      razonSo: proveedorData?.razon_social || "",
      direccion: proveedorData?.direccion || "",
      local_: proveedorData?.local_ || "",
      telefono: proveedorData?.telefono || "",
      persona_contacto: proveedorData?.persona_contacto || ""
    });
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleUpdateProveedor = async () => {
    if (!editingData.razonSo.trim() || !editingData.direccion.trim() || !editingData.local_.trim() || !editingData.telefono.trim() || !editingData.persona_contacto.trim()) {
      setActionMessage("Todos los campos son obligatorios");
      return;
    }

    setLoadingAction(true);
    try {
      const response = await fetch(`http://localhost:1234/suppliers/${rifValue}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razonSo: editingData.razonSo,
          direccion: editingData.direccion,
          local_: editingData.local_,
          telefono: editingData.telefono,
          persona_contacto: editingData.persona_contacto
        })
      });

      if (response.ok) {
        setActionMessage("Proveedor actualizado exitosamente");
        setShowEditModal(false);
        window.location.reload();
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al actualizar el proveedor");
      }
    } catch (err) {
      setActionMessage("Error de conexión");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteProveedor = async () => {
    setLoadingAction(true);
    try {
      const response = await fetch(`http://localhost:1234/suppliers/${rifValue}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setActionMessage("Proveedor eliminado exitosamente");
        setShowDeleteModal(false);
        navigate('/Search');
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al eliminar el proveedor");
      }
    } catch (err) {
      setActionMessage("Error de conexión");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div>
      <TopBar text='Detalles del Proveedor' menu={true} />
      {/* Botón flotante de regreso */}
      {!menuAbierto && (
        <button className={styles.backFab} onClick={() => navigate('/Search')}>
          ←
        </button>
      )}
      <div className={styles.container}>
        {/* Botones de acción */}
        <div className={styles.actionButtons}>
          <button 
            className={styles.editButton}
            onClick={handleEdit}
          >
            ✏️ Editar Proveedor
          </button>
          <button 
            className={styles.deleteButton}
            onClick={handleDelete}
          >
            🗑️ Eliminar Proveedor
          </button>
        </div>

        <div className={styles.detailCard}>
          <div className={styles.clientHeader}>
            <h2>{proveedorData?.razon_social || "Razón Social no disponible"}</h2>
            
            <div className={styles.clientInfoGrid}>
              <div className={styles.infoSection}>
                <h3>Detalles</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>RIF:</span>
                  <span className={styles.value}>{proveedorData?.RIF || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Razón Social:</span>
                  <span className={styles.value}>{proveedorData?.razon_social || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Local:</span>
                  <span className={styles.value}>{proveedorData?.local_ || "No disponible"}</span>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Contacto</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Persona de Contacto:</span>
                  <span className={styles.value}>{proveedorData?.persona_contacto || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Teléfono:</span>
                  <span className={styles.value}>{proveedorData?.telefono || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Dirección:</span>
                  <span className={styles.value}>{proveedorData?.direccion || "No disponible"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de secciones */}
          <div className={styles.tableSection}>
            <h3>Información Adicional</h3>
            <div className={styles.tableContainer}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Sección</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Productos Suministrados</td>
                    <td>Lista de productos que suministra</td>
                    <td>Vacío</td>
                    <td>
                      <button className={styles.actionButton}>Ver</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Historial de Compras</td>
                    <td>Registro de compras realizadas</td>
                    <td>Vacío</td>
                    <td>
                      <button className={styles.actionButton}>Ver</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Establecimientos Asociados</td>
                    <td>Establecimientos que trabajan con este proveedor</td>
                    <td>Vacío</td>
                    <td>
                      <button className={styles.actionButton}>Ver</button>
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
            <h3>Editar Proveedor</h3>
            <div className={styles.formGroup}>
              <label>Razón Social:</label>
              <input
                type="text"
                value={editingData.razonSo}
                onChange={(e) => setEditingData({...editingData, razonSo: e.target.value})}
                className={styles.modalInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Dirección:</label>
              <input
                type="text"
                value={editingData.direccion}
                onChange={(e) => setEditingData({...editingData, direccion: e.target.value})}
                className={styles.modalInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Local:</label>
              <input
                type="text"
                value={editingData.local_}
                onChange={(e) => setEditingData({...editingData, local_: e.target.value})}
                className={styles.modalInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Teléfono:</label>
              <input
                type="text"
                value={editingData.telefono}
                onChange={(e) => setEditingData({...editingData, telefono: e.target.value})}
                className={styles.modalInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Persona de Contacto:</label>
              <input
                type="text"
                value={editingData.persona_contacto}
                onChange={(e) => setEditingData({...editingData, persona_contacto: e.target.value})}
                className={styles.modalInput}
              />
            </div>
            {actionMessage && (
              <div className={styles.message}>
                {actionMessage}
              </div>
            )}
            <div className={styles.modalButtons}>
              <button 
                onClick={handleUpdateProveedor}
                disabled={loadingAction}
                className={styles.confirmButton}
              >
                {loadingAction ? "Actualizando..." : "Actualizar"}
              </button>
              <button 
                onClick={() => setShowEditModal(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Eliminación */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Confirmar Eliminación</h3>
            <p>¿Está seguro que desea eliminar al proveedor {proveedorData?.razon_social}?</p>
            <p>Esta acción no se puede deshacer.</p>
            {actionMessage && (
              <div className={styles.message}>
                {actionMessage}
              </div>
            )}
            <div className={styles.modalButtons}>
              <button 
                onClick={handleDeleteProveedor}
                disabled={loadingAction}
                className={styles.deleteConfirmButton}
              >
                {loadingAction ? "Eliminando..." : "Eliminar"}
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProveedorDetalle; 