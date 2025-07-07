import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuDespegable from "../../components/Menu Desplegable/MenuDesplegable";
import styles from './Detalle.module.css';
import TopBar from '../../components/TopBar/TopBar';
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';

const ProveedorDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { proveedor, rif } = location.state || {};
  
  const [proveedorData, setProveedorData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  
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
      if (!rif) {
        setError("No se proporcionó el RIF del proveedor");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        
        // Fetch del proveedor específico usando el RIF
        const response = await fetch(`http://localhost:1234/suppliers/${rif}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setProveedorData(data);
      } catch (err) {
        console.error("Error fetching proveedor data:", err);
        setError("No se pudo cargar la información del proveedor");
      } finally {
        setLoading(false);
      }
    };

    fetchProveedorData();
  }, [rif]);

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
      <TopBar text='Detalles del Proveedor' menu={true} />
      {/* Botón flotante de regreso */}
      {!menuAbierto && (
        <button className={styles.backFab} onClick={() => navigate('/Search')}>
          ←
        </button>
      )}
      <div className={styles.container}>
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
    </div>
  );
};

export default ProveedorDetalle; 