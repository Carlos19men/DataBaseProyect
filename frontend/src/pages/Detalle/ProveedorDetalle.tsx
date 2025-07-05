import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Detalle.module.css';

const ProveedorDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { proveedor } = location.state || {};

  if (!proveedor) {
    return (
      <div className={styles.container}>
        <h1>Proveedor no encontrado</h1>
        <button onClick={() => navigate('/busqueda')}>Volver a búsqueda</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate('/busqueda')} className={styles.backButton}>
          ← Volver
        </button>
        <h1>Detalle del Proveedor</h1>
      </div>
      
      <div className={styles.detailCard}>
        <h2>{proveedor.razon_social}</h2>
        
        <div className={styles.infoSection}>
          <h3>Información General</h3>
          <div className={styles.infoRow}>
            <span className={styles.label}>RIF:</span>
            <span className={styles.value}>{proveedor.RIF}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Dirección:</span>
            <span className={styles.value}>{proveedor.direccion}</span>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h3>Información de Contacto</h3>
          <div className={styles.infoRow}>
            <span className={styles.label}>Persona de Contacto:</span>
            <span className={styles.value}>{proveedor.persona_contacto}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Local:</span>
            <span className={styles.value}>{proveedor.local_}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Teléfono:</span>
            <span className={styles.value}>{proveedor.telefono}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProveedorDetalle; 