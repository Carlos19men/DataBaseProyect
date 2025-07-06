import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuDespegable from "../../components/Menu Desplegable/MenuDesplegable";
import styles from './Detalle.module.css';
import TopBar from '../../components/TopBar/TopBar';

const EmpleadoDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { empleado, ci } = location.state || {};
  
  const [empleadoData, setEmpleadoData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [nombre, apellido] = (empleadoData?.empleado || "").split(" ");
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
    const fetchEmpleadoData = async () => {
      if (!ci) {
        setError("No se proporcionó la cédula del empleado");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        
        // Fetch del empleado específico usando la cédula
        const response = await fetch(`http://localhost:1234/employee/${ci}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
      
        setEmpleadoData(data);
     
      } catch (err) {
        console.error("Error fetching empleado data:", err);
        setError("No se pudo cargar la información del empleado");
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleadoData();
  }, [ci]);

  if (loading) {
    return (
      <div>
          <TopBar text='Detalles del Empleado' menu={true}></TopBar>

        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Cargando información del empleado...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !empleadoData) {
    return (
      <div>
       <TopBar text='Detalles del Empleado' menu={true}></TopBar>
        <div className={styles.container}>
          <div className={styles.detailCard}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Error: {error || "Empleado no encontrado"}</h3>
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
     <TopBar text='Detalles del Empleado' menu={true}></TopBar>
      {/* Botón flotante de regreso */}
      {!menuAbierto && (
        <button className={styles.backFab} onClick={() => navigate('/Search')}>
          ←
        </button>
      )}
      <div className={styles.container}>
        <div className={styles.detailCard}>
          <div className={styles.clientHeader}>
           
            <h2 style={{textAlign:"center"}}>{empleadoData?.empleado ? `${empleadoData.empleado}` : "Nombre no disponible"}</h2>
            
            <div className={styles.clientInfoGrid}>
              <div className={styles.infoSection}>
                <h3>Detalles</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Cédula:</span>
                  <span className={styles.value}>{empleadoData?.CI_emp || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Nombre:</span>
                  <span className={styles.value}>{nombre ? nombre : "Nombre no disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Apellido:</span>
                  <span className={styles.value}> {apellido ? apellido : ""}</span>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Información Laboral</h3>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Sueldo:</span>
                  <span className={styles.value}>${empleadoData?.sueldo || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Establecimiento:</span>
                  <span className={styles.value}>{empleadoData?.RIF_establecimiento || "No disponible"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Servicio a Supervisar:</span>
                  <span className={styles.value}>{empleadoData?.nro_servicio_supervisar || "No disponible"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.infoSection}>
            <h3 style={{textAlign:"center"}}>Información de Contacto</h3>
            <div className={styles.infoRow}>
              <span className={styles.label}>Teléfono:</span>
              <span className={styles.value}>{empleadoData?.telefono || "No disponible"}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Dirección:</span>
              <span className={styles.value}>{empleadoData?.direccion || "No disponible"}</span>
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
                    <td>Especializaciones</td>
                    <td>Servicios en los que está especializado</td>
                    <td>Vacío</td>
                    <td>
                      <button className={styles.actionButton}>Ver</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Historial de Trabajo</td>
                    <td>Registro de actividades realizadas</td>
                    <td>Vacío</td>
                    <td>
                      <button className={styles.actionButton}>Ver</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Asignaciones</td>
                    <td>Órdenes de servicio asignadas</td>
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

export default EmpleadoDetalle; 