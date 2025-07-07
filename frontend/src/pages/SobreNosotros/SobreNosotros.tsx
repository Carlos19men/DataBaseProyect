import React from 'react';
import styles from './SobreNosotros.module.css';
import logo from '../../assets/logo.png';
import ods12 from '../../assets/ODS12.jpg';
import TopBar from '../../components/TopBar/TopBar';
import LandingBG from '../../components/LandingBG/LandingBG';

const SobreNosotros: React.FC = () => {
  return (
    <div className={styles.container}>
      <LandingBG />
      <TopBar text="Sobre Nosotros" menu={false} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>SOBRE NOSOTROS</h2>
        <div className={styles.aboutRow}>
          <img
            src={logo}
            alt="Logo M&U"
            className={styles.image}
          />
          <div className={styles.aboutText}>
            Somos una empresa dedicada a la limpieza y mantenimiento de vehículos, con alto sentido ecológico.<br /><br />
            Por eso nuestro lema es "M&amp;U al servicio del planeta", estamos comprometidos a utilizar solo productos ecológicos por el bienestar de nuestros clientes y nuestro planeta.
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>M&amp;U al Servicio del Planeta</h2>
        <div className={styles.planetRow}>
          <div className={styles.planetText}>
            Multiservicios Universal (M&amp;U) promueve el consumo responsable al utilizar exclusivamente productos ecológicos en la limpieza vehicular.<br /><br />
            Su sistema digital registra y comunica prácticas de gestión ambiental, fortaleciendo la transparencia y la sostenibilidad operativa.
          </div>
          <img src={ods12} alt="ODS 12" className={styles.ods12Img} />
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros; 