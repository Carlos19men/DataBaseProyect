import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuDespegable from "../../components/Menu Desplegable/MenuDesplegable";
import styles from './Detalle.module.css';

const ClienteDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ci } = location.state || {};
  
  const [clienteData, setClienteData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingData, setEditingData] = useState({
    name: "",
    lastName: "",
    email: ""
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
    const fetchClienteData = async () => {
      if (!ci) {
        setError("No se proporcionó la cédula del cliente");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        
        // Fetch del cliente específico usando la cédula
        const response = await fetch(`http://localhost:1234/customer/${ci}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setClienteData(data);
      } catch (err) {
        console.error("Error fetching cliente data:", err);
        setError("No se pudo cargar la información del cliente");
      } finally {
        setLoading(false);
      }
    };

    fetchClienteData();
  }, [ci]);

  if (loading) {
    return (
      <div>
        <div className={styles.bar}>
          <MenuDespegable />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ color: "white", margin: 0, fontSize: "2.5rem", fontWeight: 600 }}>
              Detalles del Cliente
            </h1>
            <h3 style={{ color: "white", margin: "0.5rem 0 0 0", fontSize: "1.2rem", fontWeight: 400 }}>
              Datos Personales
            </h3>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Cargando información del cliente...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !clienteData) {
    return (
      <div>
        <div className={styles.bar}>
          <MenuDespegable />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ color: "white", margin: 0, fontSize: "2.5rem", fontWeight: 600 }}>
              Detalles del Cliente
            </h1>
            <h3 style={{ color: "white", margin: "0.5rem 0 0 0", fontSize: "1.2rem", fontWeight: 400 }}>
              Datos Personales
            </h3>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Error: {error || "Cliente no encontrado"}</h3>
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
      name: clienteData?.nombre || "",
      lastName: clienteData?.apellido || "",
      email: clienteData?.correo || ""
    });
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleUpdateCliente = async () => {
    if (!editingData.name.trim() || !editingData.lastName.trim() || !editingData.email.trim()) {
      setActionMessage("Todos los campos son obligatorios");
      return;
    }

    setLoadingAction(true);
    try {
      const response = await fetch(`http://localhost:1234/customer`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          CI: clienteData?.CI,
          name: editingData.name,
          lastName: editingData.lastName,
          email: editingData.email
        })
      });

      if (response.ok) {
        setActionMessage("Cliente actualizado exitosamente");
        setShowEditModal(false);
        // Recargar datos del cliente
        window.location.reload();
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al actualizar el cliente");
      }
    } catch (err) {
      setActionMessage("Error de conexión");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteCliente = async () => {
    setLoadingAction(true);
    try {
      const response = await fetch(`http://localhost:1234/customer/${clienteData?.CI}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setActionMessage("Cliente eliminado exitosamente");
        setShowDeleteModal(false);
        navigate('/Search');
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al eliminar el cliente");
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
            Detalles del Cliente
          </h1>
          <h3 style={{ color: "white", margin: "0.5rem 0 0 0", fontSize: "1.2rem", fontWeight: 400 }}>
            Datos Personales
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
            ✏️ Editar Cliente
          </button>
          <button 
            className={styles.deleteButton}
            onClick={handleDelete}
          >
            🗑️ Eliminar Cliente
          </button>
        </div>

        {/* Cabecera con información detallada */}
        <div className={styles.detailCard}>
          <div className={styles.clientHeader}>
            <h2>{clienteData?.nombre && clienteData?.apellido ? `${clienteData.nombre} ${clienteData.apellido}` : "Nombre no disponible"}</h2>
            
            <div className={styles.clientInfoGrid}>
              <div className={styles.infoSection}>
                <h3>Detalles</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Cédula:</span>
                  <span className={styles.value}>{clienteData?.CI || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Nombre:</span>
                  <span className={styles.value}>{clienteData?.nombre || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Apellido:</span>
                  <span className={styles.value}>{clienteData?.apellido || "No disponible"}</span>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Contactos</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Correo Electrónico:</span>
                  <span className={styles.value}>{clienteData?.correo || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Teléfono 1:</span>
                  <span className={styles.value}>{clienteData?.telefono1 || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Teléfono 2:</span>
                  <span className={styles.value}>{clienteData?.telefono2 || "No disponible"}</span>
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
                    <td>Historial de Compras</td>
                    <td>Registro de todas las compras realizadas</td>
                    <td>Vacío</td>
                    <td>
                      <button className={styles.actionButton}>Ver</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Pedidos Pendientes</td>
                    <td>Pedidos en proceso o pendientes de entrega</td>
                    <td>Vacío</td>
                    <td>
                      <button className={styles.actionButton}>Ver</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Preferencias</td>
                    <td>Configuración de preferencias del cliente</td>
                    <td>Vacío</td>
                    <td>
                      <button className={styles.actionButton}>Configurar</button>
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
            <h3>Editar Cliente</h3>
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
              <label>Apellido:</label>
              <input
                type="text"
                value={editingData.lastName}
                onChange={(e) => setEditingData({...editingData, lastName: e.target.value})}
                className={styles.modalInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <input
                type="email"
                value={editingData.email}
                onChange={(e) => setEditingData({...editingData, email: e.target.value})}
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
                onClick={handleUpdateCliente}
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
            <p>¿Está seguro que desea eliminar al cliente {clienteData?.nombre} {clienteData?.apellido}?</p>
            <p>Esta acción no se puede deshacer.</p>
            {actionMessage && (
              <div className={styles.message}>
                {actionMessage}
              </div>
            )}
            <div className={styles.modalButtons}>
              <button 
                onClick={handleDeleteCliente}
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

export default ClienteDetalle; 