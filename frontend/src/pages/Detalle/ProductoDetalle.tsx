import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Detalle.module.css';
import TopBar from '../../components/TopBar/TopBar';
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';

const ProductoDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};

  const [productoData, setProductoData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const checkMenuState = () => {
      const menuState = localStorage.getItem('menuAbierto') === 'true';
      setMenuAbierto(menuState);
    };

    checkMenuState();
    const handleStorageChange = () => checkMenuState();
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(checkMenuState, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const fetchProductoData = async () => {
      if (!id) {
        setError("No se proporcionó el ID del producto");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const response = await fetch(`http://localhost:1234/product/${id}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

        setProductoData(Array.isArray(data) ? data[0] : data);

      } catch (err) {
        setError("No se pudo cargar la información del producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProductoData();
  }, [id]);

  const getContaminationColor = (nivel: number) => {
    switch (nivel) {
      case 1: return '#4CAF50';
      case 2: return '#8BC34A';
      case 3: return '#FFC107';
      case 4: return '#FF9800';
      case 5: return '#F44336';
      default: return '#9E9E9E';
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
        <TopBar text='Detalles del Producto' menu={true} />
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
        <TopBar text='Detalles del Producto' menu={true} />
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

  return (
    <div>
      <TopBar text='Detalles del Producto' menu={true} />
      {/* Botón flotante de regreso */}
      {!menuAbierto && (
        <button className={styles.backFab} onClick={() => navigate('/Search')}>
          ←
        </button>
      )}
      
      <div className={styles.container}>
        <div className={styles.detailCard}>
          <div className={styles.clientHeader}>
            <h2 style={{textAlign:"center"}}>{productoData?.nombreProducto || "Nombre no disponible"}</h2>
            <div className={styles.clientInfoGrid}>
              <div className={styles.infoSection}>
                <h3>Detalles</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>ID:</span>
                  <span className={styles.value}>{productoData?.id_producto || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Nombre:</span>
                  <span className={styles.value}>{productoData?.nombreProducto || "No disponible"}</span>
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
            <h3 style={{textAlign:"center"}}>Información Técnica</h3>
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
            <h3 style={{textAlign:"center"}}>Información Adicional</h3>
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
    </div>
  );
};

export default ProductoDetalle;