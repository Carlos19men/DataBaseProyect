import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Detalle.module.css';

const ProductoDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { producto } = location.state || {};

  if (!producto) {
    return (
      <div className={styles.container}>
        <h1>Producto no encontrado</h1>
        <button onClick={() => navigate('/busqueda')}>Volver a búsqueda</button>
      </div>
    );
  }

  const getNivelContaminacionClass = (nivel: number) => {
    switch (nivel) {
      case 1: return styles.nivelContaminacion1;
      case 2: return styles.nivelContaminacion2;
      case 3: return styles.nivelContaminacion3;
      case 4: return styles.nivelContaminacion4;
      case 5: return styles.nivelContaminacion5;
      default: return styles.nivelContaminacion1;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate('/busqueda')} className={styles.backButton}>
          ← Volver
        </button>
        <h1>Detalle del Producto</h1>
      </div>
      
      <div className={styles.detailCard}>
        <h2>{producto.nombreProducto}</h2>
        
        <div className={styles.infoSection}>
          <h3>Información General</h3>
          <div className={styles.infoRow}>
            <span className={styles.label}>Precio:</span>
            <span className={styles.value}>${producto.precio}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Familia:</span>
            <span className={styles.value}>{producto.Familia}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Tipo:</span>
            <span className={producto.tipo === "ECOLÓGICO" ? styles.tipoEco : styles.tipoNoEco}>
              {producto.tipo}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Nivel de Contaminación:</span>
            <span className={getNivelContaminacionClass(producto.nivel_contaminacion)}>
              {producto.nivel_contaminacion}/5
            </span>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h3>Información Adicional</h3>
          <div className={styles.infoRow}>
            <span className={styles.label}>Descripción:</span>
            <span className={styles.value}>{producto.descripcion}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Cantidad Mínima:</span>
            <span className={styles.value}>{producto.cantidadMinima}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Cantidad Máxima:</span>
            <span className={styles.value}>{producto.cantidadMaxima}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Tratamiento de Residuos:</span>
            <span className={styles.value}>{producto.tratamiento_residuos}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle; 