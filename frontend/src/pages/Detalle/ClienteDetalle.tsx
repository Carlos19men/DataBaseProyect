import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Detalle.module.css';
import TopBar from '../../components/TopBar/TopBar';
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';



const ClienteDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ci } = location.state || {};
  
  const [clienteData, setClienteData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
const [nombre, apellido] = (clienteData?.cliente || "").split(" ");
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
        <TopBar text='Detalles del Cliente' menu={true} />
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
        <TopBar text='Detalles del Cliente' menu={true} />
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

  return (
    <div>
      <TopBar text='Detalles del Cliente' menu={true} />
      {/* Botón flotante de regreso */}
      {!menuAbierto && (
        <button className={styles.backFab} onClick={() => navigate('/Search')}>
          ←
        </button>
      )}
      <div className={styles.container}>
        {/* Cabecera con información detallada */}
        <div className={styles.detailCard}>
          <div className={styles.clientHeader}>
            <h2 style={{textAlign:"center"}}>{clienteData?.cliente ? `${clienteData.cliente}` : "Nombre no disponible"}</h2>
            
            <div className={styles.clientInfoGrid}>
              <div className={styles.infoSection}>
                <h3>Detalles</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Cédula:</span>
                  <span className={styles.value}>{clienteData?.CI || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Nombre:</span>
                  <span className={styles.value}>{nombre || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Apellido:</span>
                  <span className={styles.value}>{apellido || "No disponible"}</span>
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
    </div>
  );
};

export default ClienteDetalle; 