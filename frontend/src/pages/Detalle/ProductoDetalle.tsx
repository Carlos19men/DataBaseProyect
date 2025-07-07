import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuDespegable from "../../components/Menu Desplegable/MenuDesplegable";
import styles from './Detalle.module.css';

const ProductoDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { producto, id } = location.state || {};
  
  const [productoData, setProductoData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingData, setEditingData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    minimo: "",
    maximo: "",
    tratamiento_residuos: "",
    nivel_contaminacion: "",
    info_manejo: ""
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
    const handler = (e: any) => setMenuAbierto(!!e.detail?.activo);
    window.addEventListener('menu-toggle', handler);
    return () => window.removeEventListener('menu-toggle', handler);
  }, []);

  const getContaminationColor = (nivel: number) => {
    switch (nivel) {
      case 1: return '#4CAF50'; // Verde - Muy bajo
      case 2: return '#8BC34A'; // Verde claro - Bajo
      case 3: return '#FFC107'; // Amarillo - Medio
      case 4: return '#FF9800'; // Naranja - Alto
      case 5: return '#F44336'; // Rojo - Muy alto
      default: return '#9E9E9E'; // Gris - No disponible
    }
  };

  const getContaminationText = (nivel: number) => {
    switch (nivel) {
      case 1: return 'Muy Bajo';
      case 2: return 'Bajo';
      case 3: return 'Medio';
      case 4: return 'Alto';
      case 5: return 'Muy Alto';
      default: return 'No disponible';
    }
  };

  if (loading) {
    return (
      <div>
        <div className={styles.bar}>
          <MenuDespegable />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ color: "white", margin: 0, fontSize: "2.5rem", fontWeight: 600 }}>
              Detalles del Producto
            </h1>
            <h3 style={{ color: "white", margin: "0.5rem 0 0 0", fontSize: "1.2rem", fontWeight: 400 }}>
              Información General
            </h3>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Cargando información del producto...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !productoData) {
    return (
      <div>
        <div className={styles.bar}>
          <MenuDespegable />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ color: "white", margin: 0, fontSize: "2.5rem", fontWeight: 600 }}>
              Detalles del Producto
            </h1>
            <h3 style={{ color: "white", margin: "0.5rem 0 0 0", fontSize: "1.2rem", fontWeight: 400 }}>
              Información General
            </h3>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Error: {error || "Producto no encontrado"}</h3>
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
      nombre: productoData?.nombre || "",
      precio: productoData?.precio || "",
      descripcion: productoData?.descripcion || "",
      minimo: productoData?.minimo || "",
      maximo: productoData?.maximo || "",
      tratamiento_residuos: productoData?.tratamiento_residuos || "",
      nivel_contaminacion: productoData?.nivel_contaminacion || "",
      info_manejo: productoData?.info_manejo || ""
    });
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleUpdateProducto = async () => {
    if (!editingData.nombre.trim() || !editingData.precio.trim() || !editingData.descripcion.trim() || !editingData.minimo.trim() || !editingData.maximo.trim()) {
      setActionMessage("Los campos básicos son obligatorios");
      return;
    }

    if (productoData?.tipo === "NO ECOLÓGICO" && (!editingData.tratamiento_residuos.trim() || !editingData.nivel_contaminacion.trim() || !editingData.info_manejo.trim())) {
      setActionMessage("Los campos de producto no ecológico son obligatorios");
      return;
    }

    setLoadingAction(true);
    try {
      const body: any = {
        id_producto: productoData?.id_producto,
        nombre: editingData.nombre,
        precio: editingData.precio,
        descripcion: editingData.descripcion,
        minimo: editingData.minimo,
        maximo: editingData.maximo
      };

      if (productoData?.tipo === "NO ECOLÓGICO") {
        body.tratamiento_residuos = editingData.tratamiento_residuos;
        body.nivel_contaminacion = editingData.nivel_contaminacion;
        body.info_manejo = editingData.info_manejo;
      }

      const response = await fetch(`http://localhost:1234/product`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setActionMessage("Producto actualizado exitosamente");
        setShowEditModal(false);
        window.location.reload();
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al actualizar el producto");
      }
    } catch (err) {
      setActionMessage("Error de conexión");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteProducto = async () => {
    setLoadingAction(true);
    try {
      const response = await fetch(`http://localhost:1234/product`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_producto: productoData?.id_producto
        })
      });

      if (response.ok) {
        setActionMessage("Producto eliminado exitosamente");
        setShowDeleteModal(false);
        navigate('/Search');
      } else {
        const errorData = await response.json();
        setActionMessage(errorData.message || "Error al eliminar el producto");
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
            Detalles del Producto
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
            ✏️ Editar Producto
          </button>
          <button 
            className={styles.deleteButton}
            onClick={handleDelete}
          >
            🗑️ Eliminar Producto
          </button>
        </div>

        <div className={styles.detailCard}>
          <div className={styles.clientHeader}>
            <h2>{productoData?.nombre || "Nombre no disponible"}</h2>
            
            <div className={styles.clientInfoGrid}>
              <div className={styles.infoSection}>
                <h3>Detalles</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>ID:</span>
                  <span className={styles.value}>{productoData?.id_producto || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Nombre:</span>
                  <span className={styles.value}>{productoData?.nombre || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Tipo:</span>
                  <span className={styles.value}>{productoData?.tipo || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Precio:</span>
                  <span className={styles.value}>${productoData?.precio || "No disponible"}</span>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Inventario</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Mínimo:</span>
                  <span className={styles.value}>{productoData?.minimo || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Máximo:</span>
                  <span className={styles.value}>{productoData?.maximo || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Nivel de Contaminación:</span>
                  <span 
                    className={styles.value} 
                    style={{ 
                      color: getContaminationColor(productoData?.nivel_contaminacion),
                      fontWeight: 'bold'
                    }}
                  >
                    {getContaminationText(productoData?.nivel_contaminacion)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.infoSection}>
            <h3>Información Técnica</h3>
            <div className={styles.infoRow}>
              <span className={styles.label}>Descripción:</span>
              <span className={styles.value}>{productoData?.descripcion || "No disponible"}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Tratamiento de Residuos:</span>
              <span className={styles.value}>{productoData?.tratamiento_residuos || "No disponible"}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Información de Manejo:</span>
              <span className={styles.value}>{productoData?.info_manejo || "No disponible"}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Familia:</span>
              <span className={styles.value}>{productoData?.id_familia || "No disponible"}</span>
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
                    <td>Inventario por Establecimiento</td>
                    <td>Stock disponible en cada establecimiento</td>
                    <td>Vacío</td>
                    <td>
                      <button className={styles.actionButton}>Ver</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Proveedores</td>
                    <td>Proveedores que suministran este producto</td>
                    <td>Vacío</td>
                    <td>
                      <button className={styles.actionButton}>Ver</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Historial de Compras</td>
                    <td>Registro de compras de este producto</td>
                    <td>Vacío</td>
                    <td>
                      <button className={styles.actionButton}>Ver</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Actividades Relacionadas</td>
                    <td>Actividades que utilizan este producto</td>
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
            <h3>Editar Producto</h3>
            <div className={styles.formGroup}>
              <label>Nombre:</label>
              <input
                type="text"
                value={editingData.nombre}
                onChange={(e) => setEditingData({...editingData, nombre: e.target.value})}
                className={styles.modalInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Precio:</label>
              <input
                type="number"
                value={editingData.precio}
                onChange={(e) => setEditingData({...editingData, precio: e.target.value})}
                className={styles.modalInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Descripción:</label>
              <input
                type="text"
                value={editingData.descripcion}
                onChange={(e) => setEditingData({...editingData, descripcion: e.target.value})}
                className={styles.modalInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Cantidad Mínima:</label>
              <input
                type="number"
                value={editingData.minimo}
                onChange={(e) => setEditingData({...editingData, minimo: e.target.value})}
                className={styles.modalInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Cantidad Máxima:</label>
              <input
                type="number"
                value={editingData.maximo}
                onChange={(e) => setEditingData({...editingData, maximo: e.target.value})}
                className={styles.modalInput}
              />
            </div>
            {productoData?.tipo === "NO ECOLÓGICO" && (
              <>
                <div className={styles.formGroup}>
                  <label>Tratamiento de Residuos:</label>
                  <input
                    type="text"
                    value={editingData.tratamiento_residuos}
                    onChange={(e) => setEditingData({...editingData, tratamiento_residuos: e.target.value})}
                    className={styles.modalInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Nivel de Contaminación:</label>
                  <select
                    value={editingData.nivel_contaminacion}
                    onChange={(e) => setEditingData({...editingData, nivel_contaminacion: e.target.value})}
                    className={styles.modalInput}
                  >
                    <option value="">Seleccione</option>
                    <option value="1">1 - Muy Bajo</option>
                    <option value="2">2 - Bajo</option>
                    <option value="3">3 - Medio</option>
                    <option value="4">4 - Alto</option>
                    <option value="5">5 - Muy Alto</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Información de Manejo:</label>
                  <input
                    type="text"
                    value={editingData.info_manejo}
                    onChange={(e) => setEditingData({...editingData, info_manejo: e.target.value})}
                    className={styles.modalInput}
                  />
                </div>
              </>
            )}
            {actionMessage && (
              <div className={styles.message}>
                {actionMessage}
              </div>
            )}
            <div className={styles.modalButtons}>
              <button 
                onClick={handleUpdateProducto}
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
            <p>¿Está seguro que desea eliminar el producto {productoData?.nombre}?</p>
            <p>Esta acción no se puede deshacer.</p>
            {actionMessage && (
              <div className={styles.message}>
                {actionMessage}
              </div>
            )}
            <div className={styles.modalButtons}>
              <button 
                onClick={handleDeleteProducto}
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

export default ProductoDetalle; 