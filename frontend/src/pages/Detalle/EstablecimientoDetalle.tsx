import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuDespegable from "../../components/Menu Desplegable/MenuDesplegable";
import styles from './Detalle.module.css';

const EstablecimientoDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { establecimiento } = location.state || {};

  if (!establecimiento) {
    return (
      <div className={styles.container}>
        <h1>Establecimiento no encontrado</h1>
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
        <h1>Detalle del Establecimiento</h1>
      </div>
      
      <div className={styles.detailCard}>
        <h2>{establecimiento.nombre}</h2>
        
        <div className={styles.infoSection}>
          <h3>Información General</h3>
          <div className={styles.infoRow}>
            <span className={styles.label}>RIF:</span>
            <span className={styles.value}>{establecimiento.RIF}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Ciudad:</span>
            <span className={styles.value}>{establecimiento.ciudad}</span>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h3>Información de Gestión</h3>
          <div className={styles.infoRow}>
            <span className={styles.label}>Encargado:</span>
            <span className={styles.value}>{establecimiento.encargado}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Fecha de Encargo:</span>
            <span className={styles.value}>{establecimiento.fecha_encargado}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstablecimientoDetalle; 