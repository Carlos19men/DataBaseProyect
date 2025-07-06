import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuDespegable from "../../components/Menu Desplegable/MenuDespegable";
import styles from './Detalle.module.css';

const ModeloDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { codigo, cod_marca } = location.state || {};
  
  const [modeloData, setModeloData] = useState<any>(null);
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
        <div className={styles.bar}>
          <MenuDespegable />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ color: "white", margin: 0, fontSize: "2.5rem", fontWeight: 600 }}>
              Detalles del Modelo
            </h1>
            <h3 style={{ color: "white", margin: "0.5rem 0 0 0", fontSize: "1.2rem", fontWeight: 400 }}>
              Información del Modelo
            </h3>
          </div>
        </div>
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
        <div className={styles.bar}>
          <MenuDespegable />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ color: "white", margin: 0, fontSize: "2.5rem", fontWeight: 600 }}>
              Detalles del Modelo
            </h1>
            <h3 style={{ color: "white", margin: "0.5rem 0 0 0", fontSize: "1.2rem", fontWeight: 400 }}>
              Información del Modelo
            </h3>
          </div>
        </div>
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

  return (
    <div>
      <div className={styles.bar}>
        <MenuDespegable />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ color: "white", margin: 0, fontSize: "2.5rem", fontWeight: 600 }}>
            Detalles del Modelo
          </h1>
          <h3 style={{ color: "white", margin: "0.5rem 0 0 0", fontSize: "1.2rem", fontWeight: 400 }}>
            Información del Modelo
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
    </div>
  );
};

export default ModeloDetalle; 