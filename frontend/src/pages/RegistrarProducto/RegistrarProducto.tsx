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
    <div className={styles.container}>
      <TopBar text="Registrar Producto" menu={true} />
      <form className={styles.form}>
        {/* Fila 1: Nombre y Tipo */}
        <div className={styles.row}>
          <label className={styles.label}>Nombre:</label>
          <TextBoxMU etiqueta="" viewWidth={30} viewHeight={6} ejemplo="Nombre del producto" />
          <label className={styles.label}>Tipo:</label>
          <select
            className={styles.input}
            value={tipo}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTipo(e.target.value)}
          >
            <option value="ECOLÓGICO">ECOLÓGICO</option>
            <option value="NO ECOLÓGICO">NO ECOLÓGICO</option>
          </select>
        </div>
        {/* Fila 2: Precio y Descripción */}
        <div className={styles.row}>
          <label className={styles.label}>Precio:</label>
          <TextBoxMU etiqueta="" viewWidth={30} viewHeight={6} ejemplo="Precio" />
          <label className={styles.label}>Descripción:</label>
          <TextBoxMU etiqueta="" viewWidth={30} viewHeight={6} ejemplo="Descripción" />
        </div>
        {/* Fila 3: Cantidad máxima y mínima */}
        <div className={styles.row}>
          <label className={styles.label}>Cantidad máxima:</label>
          <div className={styles.cantidadInput}>
            <TextBoxMU etiqueta="" viewWidth={22} viewHeight={6} ejemplo="Máxima" />
          </div>
          <label className={styles.label}>Cantidad mínima:</label>
          <div className={styles.cantidadInput}>
            <TextBoxMU etiqueta="" viewWidth={22} viewHeight={6} ejemplo="Mínima" />
          </div>
        </div>
        {/* Fila condicional: Tratamiento y Nivel de contaminación */}
        {tipo === "NO ECOLÓGICO" && <>
          <div className={styles.row}>
            <label className={styles.label}>Tratamiento de residuos:</label>
            <TextBoxMU etiqueta="" viewWidth={30} viewHeight={6} ejemplo="Tratamiento de residuos" value={tratamiento} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTratamiento(e.target.value)} />
            <label className={styles.label}>Nivel de contaminación:</label>
            <select
              className={styles.input}
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
          {/* Fila condicional: Información de manejo (ocupa toda la fila) */}
          <div className={styles.rowFull}>
            <label className={styles.label}>Información de manejo:</label>
            <TextBoxMU etiqueta="" viewWidth={30} viewHeight={6} ejemplo="Información de manejo" value={manejo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setManejo(e.target.value)} />
          </div>
        </>}
        {/* Fila Familia (ocupa toda la fila) */}
        <div className={styles.rowFull}>
          <label className={styles.label}>Familia de producto:</label>
          <select
            className={styles.input}
            value={familiaSeleccionada}
            onChange={e => setFamiliaSeleccionada(e.target.value)}
          >
            <option value="">Seleccione una familia</option>
            {familias.map(f => (
              <option key={f.id_familia} value={f.id_familia}>{f.nombre}</option>
            ))}
          </select>
        </div>
        {/* Botón */}
        <div className={styles.buttonContainer}>
          <Button texto="Registrar" />
        </div>
      </form>
      {/* Floating Action Button - Back */}
      <button className={styles.backFab} onClick={handleBackClick}>
        ←
      </button>
    </div>
  );
};

export default RegistrarProducto; 