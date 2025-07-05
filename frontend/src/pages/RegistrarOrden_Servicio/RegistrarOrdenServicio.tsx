import React from "react";
import styles from "./RegistrarOrdenServicio.module.css";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/button";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";

const RegistrarOrdenServicio = () => {
  return (
    <div className={styles.container}>
      <TopBar text="Registrar Orden de Servicio" menu={true} />
      <form className={styles.form}>
        <div className={styles.row}>
          <label>Establecimiento:</label>
          <select className={styles.input}>
            <option value="">Seleccione</option>
          </select>
        </div>
        <div className={styles.row}>
          <label>Placa del Vehículo:</label>
          <input className={styles.input} type="text" />
        </div>
        <div className={styles.row}>
          <label>Agregar Servicios:</label>
          <select className={styles.input}>
            <option value="">Seleccione</option>
          </select>
        </div>
        <div className={styles.checkGroup}>
          <label>
            <input type="checkbox" checked readOnly />Servicio 1
          </label>
        </div>
        <div className={styles.row}>
          <label>Agregar Actividades:</label>
          <select className={styles.input}>
            <option value="">Seleccione</option>
          </select>
        </div>
        <div className={styles.checkGroup}>
          <label>
            <input type="checkbox" checked readOnly />Actividad 1
          </label>
          <label>
            <input type="checkbox" checked readOnly />Actividad 2
          </label>
        </div>
        <div className={styles.rowGroup}>
          <div className={styles.rowDateTime}>
            <label>Fecha Entrada:</label>
            <input className={styles.inputDate} type="text" placeholder="DD" maxLength={2} />
            <input className={styles.inputDate} type="text" placeholder="MM" maxLength={2} />
            <input className={styles.inputDate} type="text" placeholder="AA" maxLength={2} />
          </div>
          <div className={styles.rowDateTime}>
            <label>Hora Entrada:</label>
            <input className={styles.inputDate} type="text" placeholder="HH" maxLength={2} />
            <input className={styles.inputDate} type="text" placeholder="MM" maxLength={2} />
          </div>
        </div>
        <div className={styles.rowGroup}>
          <div className={styles.rowDateTime}>
            <label>Fecha Salida:</label>
            <input className={styles.inputDate} type="text" placeholder="DD" maxLength={2} />
            <input className={styles.inputDate} type="text" placeholder="MM" maxLength={2} />
            <input className={styles.inputDate} type="text" placeholder="AA" maxLength={2} />
          </div>
          <div className={styles.rowDateTime}>
            <label>Hora Estimada Salida:</label>
            <input className={styles.inputDate} type="text" placeholder="HH" maxLength={2} />
            <input className={styles.inputDate} type="text" placeholder="MM" maxLength={2} />
          </div>
        </div>
        <div className={styles.row}>
          <label>Justificación:</label>
          <TextBoxMU etiqueta="" viewWidth={30} viewHeight={8} ejemplo="Justificación" />
        </div>
        <div className={styles.row}>
          <label>Persona Autorizada:</label>
          <input className={styles.input} type="text" />
        </div>
        <div className={styles.buttonContainer}>
          <Button texto="Añadir" />
        </div>
      </form>
    </div>
  );
};

export default RegistrarOrdenServicio; 