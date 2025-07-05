import React, { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./RegistrarFamilia.module.css";

const RegistrarFamilia: React.FC = () => {
  const [nombre, setNombre] = useState("");

  return (
    <div className={styles.body}>
      <TopBar text="Registrar Familia de Productos" menu={true} />
      <div className={styles.content}>
        <form className={styles.form}>
          <div className={styles.inputGroupFull}>
            <label className={styles.label}>Nombre:</label>
            <input
              className={styles.input}
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder=""
            />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarFamilia; 