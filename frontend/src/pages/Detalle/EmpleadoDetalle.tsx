import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuDespegable from "../../components/Menu Desplegable/MenuDesplegable";
import styles from './Detalle.module.css';

const EmpleadoDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { empleado } = location.state || {};

  if (!empleado) {
    return (
      <div className={styles.container}>
        <h1>Empleado no encontrado</h1>
        <button onClick={() => navigate('/Search')}>Volver a búsqueda</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.menuContainer}>
          <MenuDespegable />
        </div>
        <h1>Detalle del Empleado</h1>
      </div>
      
      <div className={styles.detailCard}>
        <h2>{empleado.empleado}</h2>
        
        <div className={styles.infoSection}>
          <h3>Información Personal</h3>
          <div className={styles.infoRow}>
            <span className={styles.label}>Cédula:</span>
            <span className={styles.value}>{empleado.CI_emp}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Dirección:</span>
            <span className={styles.value}>{empleado.direccion}</span>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h3>Información Laboral</h3>
          <div className={styles.infoRow}>
            <span className={styles.label}>Establecimiento:</span>
            <span className={styles.value}>{empleado.Establecimiento}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>RIF Establecimiento:</span>
            <span className={styles.value}>{empleado.RIF_establecimiento}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Sueldo:</span>
            <span className={styles.value}>${empleado.sueldo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpleadoDetalle; 