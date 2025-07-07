import React, { useState, useEffect } from "react";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./RegistrarServicio.module.css";
import addIcon from "../../assets/Box.png"; // Usa el asset que prefieras, aquí de ejemplo
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';

const BASE_URL = "http://localhost:1234";

const RegistrarServicio: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [ci, setCi] = useState("");
  const [actividad, setActividad] = useState("");
  const [actividades, setActividades] = useState<any[]>([]);
  const [actividadesSeleccionadas, setActividadesSeleccionadas] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/activity/`)
      .then(res => res.json())
      .then(data => setActividades(data))
      .catch(() => setError("Error al cargar las actividades"));
  }, []);

  const agregarActividad = () => {
    if (actividad && !actividadesSeleccionadas.find(a => String(a.nro_correlativo) === String(actividad))) {
      const actividadSeleccionada = actividades.find(a => String(a.nro_correlativo) === String(actividad));
      if (actividadSeleccionada) {
        setActividadesSeleccionadas(prev => [...prev, actividadSeleccionada]);
        setActividad("");
      }
    }
  };

  const quitarActividad = (nroCorrelativo: string) => {
    setActividadesSeleccionadas(prev => prev.filter(a => String(a.nro_correlativo) !== String(nroCorrelativo)));
  };

  return (
    <div className={styles.body}>
      <TopBar text="Añadir Servicio" menu={true} />
      <div className={styles.content}>
        <form className={styles.form}>
          <div className={styles.inputGroupFull}>
            <label className={styles.label}>Nombre del Servicio:</label>
            <input
              className={styles.input}
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder=""
            />
          </div>
          <div className={styles.inputGroupFull}>
            <label className={styles.label}>C.I del supervisor del servicio:</label>
            <input
              className={styles.input}
              type="text"
              value={ci}
              onChange={e => setCi(e.target.value)}
              placeholder=""
            />
          </div>
          <div className={styles.inputGroupFull}>
            <label className={styles.label}>Agregar Actividad:</label>
            <div className={styles.selectContainer}>
              <select className={styles.select} value={actividad} onChange={e => setActividad(e.target.value)}>
                <option value="">Seleccione</option>
                {actividades.map((a: any) => (
                  <option key={a.nro_correlativo} value={a.nro_correlativo}>{a.nombre}</option>
                ))}
              </select>
              <button
                type="button"
                className={styles.addButton}
                onClick={agregarActividad}
                disabled={!actividad}
              >
                +
              </button>
            </div>
            <div className={styles.selectedItems}>
              {actividadesSeleccionadas.map((a: any) => (
                <div key={a.nro_correlativo} className={styles.selectedItem}>
                  <span>{a.nombre}</span>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => quitarActividad(a.nro_correlativo)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              Añadir
            </button>
          </div>
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default RegistrarServicio; 