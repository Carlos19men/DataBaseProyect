import React, { useState, useEffect } from "react";
import styles from "./RegistrarProducto.module.css";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/button";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
import { useNavigate } from "react-router-dom";

interface Familia {
  id_familia: number;
  nombre: string;
}

const RegistrarProducto = () => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState("ECOLÓGICO");
  const [tratamiento, setTratamiento] = useState("");
  const [nivel, setNivel] = useState("1");
  const [manejo, setManejo] = useState("");
  const [familias, setFamilias] = useState<Familia[]>([]);
  const [familiaSeleccionada, setFamiliaSeleccionada] = useState<string>("");

  // Función para manejar el regreso
  const handleBackClick = () => {
    navigate('/Search');
  };

  useEffect(() => {
    fetch("http://localhost:1234/family-products/")
      .then(res => res.json())
      .then(data => setFamilias(data))
      .catch(() => setFamilias([]));
  }, []);

  return (
    <div>
      <TopBar text="Registrar Producto" menu={true} />
      <div className={styles.container}>
        <div className={styles.detailCard}>
          <form className={styles.form}>
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Nombre</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Nombre del producto"
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Tipo</label>
              <select
                className={styles.formInput}
                value={tipo}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTipo(e.target.value)}
              >
                <option value="ECOLÓGICO">ECOLÓGICO</option>
                <option value="NO ECOLÓGICO">NO ECOLÓGICO</option>
              </select>
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Precio</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Precio"
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Descripción</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Descripción"
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Cantidad máxima</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Máxima"
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Cantidad mínima</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Mínima"
              />
            </div>
            
            {/* Campos condicionales para productos NO ECOLÓGICOS */}
            {tipo === "NO ECOLÓGICO" && (
              <>
                <div className={styles.formRow}>
                  <label className={styles.formLabel}>Tratamiento de residuos</label>
                  <input
                    className={styles.formInput}
                    type="text"
                    placeholder="Tratamiento de residuos"
                    value={tratamiento}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTratamiento(e.target.value)}
                  />
                </div>
                
                <div className={styles.formRow}>
                  <label className={styles.formLabel}>Nivel de contaminación</label>
                  <select
                    className={styles.formInput}
                    value={nivel}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNivel(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                
                <div className={styles.formRow}>
                  <label className={styles.formLabel}>Información de manejo</label>
                  <input
                    className={styles.formInput}
                    type="text"
                    placeholder="Información de manejo"
                    value={manejo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setManejo(e.target.value)}
                  />
                </div>
              </>
            )}
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Familia de producto</label>
              <select
                className={styles.formInput}
                value={familiaSeleccionada}
                onChange={e => setFamiliaSeleccionada(e.target.value)}
              >
                <option value="">Seleccione una familia</option>
                {familias.map(f => (
                  <option key={f.id_familia} value={f.id_familia}>{f.nombre}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.buttonContainer}>
              <Button texto="Registrar" />
            </div>
          </form>
        </div>
      </div>
      {/* Floating Action Button - Back */}
      <button className={styles.backFab} onClick={handleBackClick}>
        ←
      </button>
    </div>
  );
};

export default RegistrarProducto; 