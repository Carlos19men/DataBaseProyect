import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./RegistrarMarca.module.css";
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";

const RegistrarMarca: React.FC = () => {
  const [name, setname] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    if (!name.trim()) {
      setError("El nombre de la marca no puede estar vacío.");
      return;
    }

    try {
      const res = await fetch("http://localhost:1234/brand/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje("Marca registrada correctamente.");
        setname("");
        setShowSuccessPopup(true);
      } else {
        setError(data.error || data.message || "Error al registrar la marca.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className={styles.body}>
      <TopBar text="Registrar Marca" menu={true} />
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroupFull}>
            <label className={styles.label}>Nombre:</label>
            <TextBoxMU
              etiqueta=""
              ejemplo="Nombre de la marca"
              viewWidth={30}
              value={name}
              onChange={e => setname(e.target.value.slice(0, 50))}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              Añadir
            </button>
          </div>
          {mensaje && <div className={styles.success}>{mensaje}</div>}
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
      {/* Botón flotante de salir */}
      <button className={styles.backFab} onClick={handleBackClick}>
        <img src={ArrowBack} alt="Volver" style={{ width: 24, height: 24 }} />
      </button>
      {/* Modal de éxito */}
      {showSuccessPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <div className={styles.popupIcon}>✓</div>
            <h3 className={styles.popupTitle}>¡Marca registrada con éxito!</h3>
            <p className={styles.popupMessage}>
              La marca <b>{name}</b> ha sido registrada correctamente.
            </p>
            <div className={styles.popupButtons}>
              <button
                className={styles.popupButtonPrimary}
                onClick={handleClosePopup}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrarMarca;