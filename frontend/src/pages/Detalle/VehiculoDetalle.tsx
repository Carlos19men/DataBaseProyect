import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuDespegable from "../../components/Menu Desplegable/MenuDespegable";
import styles from './Detalle.module.css';

const VehiculoDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { placa } = location.state || {};
  
  const [vehiculoData, setVehiculoData] = useState<any>(null);
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
        <div className={styles.bar}>
          <MenuDespegable />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ color: "white", margin: 0, fontSize: "2.5rem", fontWeight: 600 }}>
              Detalles del Vehículo
            </h1>
            <h3 style={{ color: "white", margin: "0.5rem 0 0 0", fontSize: "1.2rem", fontWeight: 400 }}>
              Información del Vehículo
            </h3>
          </div>
        </div>
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
        <div className={styles.bar}>
          <MenuDespegable />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ color: "white", margin: 0, fontSize: "2.5rem", fontWeight: 600 }}>
              Detalles del Vehículo
            </h1>
            <h3 style={{ color: "white", margin: "0.5rem 0 0 0", fontSize: "1.2rem", fontWeight: 400 }}>
              Información del Vehículo
            </h3>
          </div>
        </div>
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

  return (
    <div>
      <div className={styles.bar}>
        <MenuDespegable />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ color: "white", margin: 0, fontSize: "2.5rem", fontWeight: 600 }}>
            Detalles del Vehículo
          </h1>
          <h3 style={{ color: "white", margin: "0.5rem 0 0 0", fontSize: "1.2rem", fontWeight: 400 }}>
            Información del Vehículo
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
    </div>
  );
};

export default VehiculoDetalle; 