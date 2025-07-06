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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [nuevoProductoId, setNuevoProductoId] = useState<string>("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [maximo, setMaximo] = useState("");
  const [minimo, setMinimo] = useState("");

  // Función para manejar el regreso
  const handleBackClick = () => {
    navigate('/Search');
  };

  // Función para navegar al detalle del producto
  const handleViewProductoDetail = () => {
    setShowSuccessPopup(false);
    navigate(`/product/${nuevoProductoId}`);
  };

  // Función para cerrar el popup
  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    navigate('/Search');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    if (!nombre || !tipo || !precio || !descripcion || !maximo || !minimo || !familiaSeleccionada) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }
    if (tipo === "NO ECOLÓGICO" && (!tratamiento || !nivel || !manejo)) {
      setError("Por favor, complete los campos de producto no ecológico.");
      return;
    }
    try {
      const body: any = {
        nombre: nombre,
        tipo: tipo,
        precio: precio,
        descripcion: descripcion,
        maximo: maximo,
        minimo: minimo,
        id_familia: familiaSeleccionada
      };
      if (tipo === "NO ECOLÓGICO") {
        body.tratamiento_residuos = tratamiento;
        body.nivel_contaminacion = nivel;
        body.info_manejo = manejo;
      }
      const res = await fetch(`http://localhost:1234/product`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        setNuevoProductoId(data.id_producto || "");
        setShowSuccessPopup(true);
        setNombre(""); setTipo("ECOLÓGICO"); setPrecio(""); setDescripcion(""); setMaximo(""); setMinimo(""); setFamiliaSeleccionada(""); setTratamiento(""); setNivel("1"); setManejo("");
      } else {
        setError(data.error || data.message || "Error al registrar el producto");
        setTimeout(() => setError(null), 5000);
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      setTimeout(() => setError(null), 5000);
    }
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
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Nombre</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Nombre del producto"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
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
                value={precio}
                onChange={e => setPrecio(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Descripción</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Cantidad máxima</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Máxima"
                value={maximo}
                onChange={e => setMaximo(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Cantidad mínima</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Mínima"
                value={minimo}
                onChange={e => setMinimo(e.target.value)}
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
          {mensaje && (
            <div style={{ color: 'green', textAlign: 'center', marginTop: 16 }}>{mensaje}</div>
          )}
          {error && (
            <div style={{ color: 'red', textAlign: 'center', marginTop: 16 }}>{error}</div>
          )}
        </div>
      </div>
      {/* Floating Action Button - Back */}
      <button className={styles.backFab} onClick={handleBackClick}>
        ←
      </button>
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <div className={styles.popupIcon}>✓</div>
            <h3 className={styles.popupTitle}>¡Producto Registrado con Éxito!</h3>
            <p className={styles.popupMessage}>
              El producto ha sido registrado correctamente.
            </p>
            <div className={styles.popupButtons}>
              <button 
                className={styles.popupButtonPrimary}
                onClick={handleViewProductoDetail}
              >
                Ver Detalle del Producto
              </button>
              <button 
                className={styles.popupButtonSecondary}
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

export default RegistrarProducto; 