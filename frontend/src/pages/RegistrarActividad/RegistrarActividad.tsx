import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./RegistrarActividad.module.css";

const BASE_URL = "http://localhost:1234";

const RegistrarActividad: React.FC = () => {
  const [servicio, setServicio] = useState("");
  const [servicios, setServicios] = useState<any[]>([]);
  const [nombre, setNombre] = useState("");
  const [costo, setCosto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${BASE_URL}/servicie/`)
      .then(res => res.json())
      .then(data => setServicios(data))
      .catch(() => setError("Error al cargar los servicios"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.body}>
      <TopBar text="Añadir Actividad" menu={true} />
      <div className={styles.content}>
        <form className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nombre:</label>
              <input
                className={styles.input}
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder=""
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Costo:</label>
              <input
                className={styles.input}
                type="number"
                min="0"
                value={costo}
                onChange={e => setCosto(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>Servicio:</label>
              <select
                className={styles.select}
                value={servicio}
                onChange={e => setServicio(e.target.value)}
              >
                <option value="">Seleccione</option>
                {servicios.map((s: any) => (
                  <option key={s.nro_servicio} value={s.nro_servicio}>{s.nombre_ser}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>Descripcion:</label>
              <textarea
                className={styles.textarea}
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
              />
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

export default RegistrarActividad; 