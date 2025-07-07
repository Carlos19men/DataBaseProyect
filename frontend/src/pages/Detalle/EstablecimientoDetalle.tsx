import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuDespegable from "../../components/Menu Desplegable/MenuDesplegable";
import styles from './Detalle.module.css';

const EstablecimientoDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { establecimiento, rif } = location.state || {};
  
  const [establecimientoData, setEstablecimientoData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingData, setEditingData] = useState({
    name: "",
    city: ""
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
    const fetchEstablecimientoData = async () => {
      if (!rif) {
        setError("No se proporcionó el RIF del establecimiento");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        
        // Fetch del establecimiento específico usando el RIF
        const response = await fetch(`http://localhost:1234/establishement/${rif}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setEstablecimientoData(data);
      } catch (err) {
        console.error("Error fetching establecimiento data:", err);
        setError("No se pudo cargar la información del establecimiento");
      } finally {
        setLoading(false);
      }
    };

    fetchEstablecimientoData();
  }, [rif]);

  if (loading) {
    return (
      <div>
        <div className={styles.bar}>
          <MenuDespegable />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ color: "white", margin: 0, fontSize: "2.5rem", fontWeight: 600 }}>
              Detalles del Establecimiento
            </h1>
            <h3 style={{ color: "white", margin: "0.5rem 0 0 0", fontSize: "1.2rem", fontWeight: 400 }}>
              Información General
            </h3>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Cargando información del establecimiento...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !establecimientoData) {
    return (
      <div>
        <div className={styles.bar}>
          <MenuDespegable />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ color: "white", margin: 0, fontSize: "2.5rem", fontWeight: 600 }}>
              Detalles del Establecimiento
            </h1>
            <h3 style={{ color: "white", margin: "0.5rem 0 0 0", fontSize: "1.2rem", fontWeight: 400 }}>
              Información General
            </h3>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Error: {error || "Establecimiento no encontrado"}</h3>
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
      name: establecimientoData?.nombre || "",
      city: establecimientoData?.ciudad || ""
    });
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleUpdateEstablecimiento = async () => {
    if (!editingData.name.trim() || !editingData.city.trim()) {
      setActionMessage("Todos los campos son obligatorios");
      return;
    }

    setLoadingAction(true);
    try {
      const response = await fetch(`http://localhost:1234/establishement/`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          RIF: establecimientoData?.RIF,
          name: editingData.name,
          city: editingData.city
        })
      });

      if (response.ok) {
        setActionMessage("Establecimiento actualizado exitosamente");
        setShowEditModal(false);
        window.location.reload();
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al actualizar el establecimiento");
      }
    } catch (err) {
      setActionMessage("Error de conexión");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteEstablecimiento = async () => {
    setLoadingAction(true);
    try {
      const response = await fetch(`http://localhost:1234/establishement/${establecimientoData?.RIF}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setActionMessage("Establecimiento eliminado exitosamente");
        setShowDeleteModal(false);
        navigate('/Search');
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al eliminar el establecimiento");
      }
    } catch (err) {
      setActionMessage("Error de conexión");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div>
      <div className={styles.bar}>
        <MenuDespegable />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ color: "white", margin: 0, fontSize: "2.5rem", fontWeight: 600 }}>
            Detalles del Establecimiento
          </h1>
          <h3 style={{ color: "white", margin: "0.5rem 0 0 0", fontSize: "1.2rem", fontWeight: 400 }}>
            Información General
          </h3>
        </div>
      </div>
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
            ✏️ Editar Establecimiento
          </button>
          <button 
            className={styles.deleteButton}
            onClick={handleDelete}
          >
            🗑️ Eliminar Establecimiento
          </button>
        </div>

        <div className={styles.detailCard}>
          <div className={styles.clientHeader}>
            <h2>{establecimientoData?.nombre || "Nombre no disponible"}</h2>
            
            <div className={styles.clientInfoGrid}>
              <div className={styles.infoSection}>
                <h3>Detalles</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>RIF:</span>
                  <span className={styles.value}>{establecimientoData?.RIF || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Nombre:</span>
                  <span className={styles.value}>{establecimientoData?.nombre || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Ciudad:</span>
                  <span className={styles.value}>{establecimientoData?.ciudad || "No disponible"}</span>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Gestión</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Encargado:</span>
                  <span className={styles.value}>{establecimientoData?.CI_encargado || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Fecha de Encargo:</span>
                  <span className={styles.value}>{establecimientoData?.fecha_encargado || "No disponible"}</span>
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
                    <td>Empleados</td>
                    <td>Lista de empleados del establecimiento</td>
                    <td>Vacío</td>
                    <td>
                      <button className={styles.actionButton}>Ver</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Órdenes de Servicio</td>
                    <td>Historial de servicios realizados</td>
                    <td>Vacío</td>
                    <td>
                      <button className={styles.actionButton}>Ver</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Inventario</td>
                    <td>Productos disponibles en el establecimiento</td>
                    <td>Vacío</td>
                    <td>
                      <button className={styles.actionButton}>Ver</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Órdenes de Compra</td>
                    <td>Compras realizadas por el establecimiento</td>
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
            <h3>Editar Establecimiento</h3>
            <div className={styles.formGroup}>
              <label>Nombre:</label>
              <input
                type="text"
                value={editingData.name}
                onChange={(e) => setEditingData({...editingData, name: e.target.value})}
                className={styles.modalInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Ciudad:</label>
              <input
                type="text"
                value={editingData.city}
                onChange={(e) => setEditingData({...editingData, city: e.target.value})}
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
                onClick={handleUpdateEstablecimiento}
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
            <p>¿Está seguro que desea eliminar el establecimiento {establecimientoData?.nombre}?</p>
            <p>Esta acción no se puede deshacer.</p>
            {actionMessage && (
              <div className={styles.message}>
                {actionMessage}
              </div>
            )}
            <div className={styles.modalButtons}>
              <button 
                onClick={handleDeleteEstablecimiento}
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

export default EstablecimientoDetalle; 