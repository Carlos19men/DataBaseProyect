import React, { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/button";
import styles from "./RegistrarCliente.module.css";
import { useNavigate } from "react-router-dom";
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";

const RegistrarCliente: React.FC = () => {
  const navigate = useNavigate();
  const [ci, setCi] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono1, setTelefono1] = useState("");
  const [telefono2, setTelefono2] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [nuevoClienteCI, setNuevoClienteCI] = useState<string>("");

  // Función para manejar el regreso
  const handleBackClick = () => {
    navigate('/Search');
  };

  // Función para navegar al detalle del cliente
  const handleViewClientDetail = () => {
    setShowSuccessPopup(false);
    navigate(`/customer/${nuevoClienteCI}`);
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
    
    if (!ci || !nombre || !apellido || !email || !telefono1 || !telefono2) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Validar que los teléfonos sean distintos
    if (telefono1 === telefono2) {
      setError("Los teléfonos deben ser diferentes.");
      return;
    }

    try {
      // Registrar cliente con teléfonos en una sola llamada
      const res = await fetch(`http://localhost:1234/customer/`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          CI: ci,
          name: nombre,
          lastName: apellido,
          email: email,
          phone1: telefono1,
          phone2: telefono2
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        setNuevoClienteCI(ci);
        setShowSuccessPopup(true);
        // Limpiar formulario
        setCi(""); 
        setNombre(""); 
        setApellido(""); 
        setEmail(""); 
        setTelefono1(""); 
        setTelefono2("");
      } else {
        setError(data.error || data.message || "Error al registrar el cliente");
        // Limpiar error después de 5 segundos
        setTimeout(() => setError(null), 5000);
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      // Limpiar error después de 5 segundos
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div>
      <TopBar text="Registrar Cliente" menu={true} />
      <div className={styles.container}>
        <div className={styles.detailCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
  <div className={styles.formRow}>
    <TextBoxMU
      etiqueta="Cédula"
      ejemplo="Ej: 12345678"
      viewWidth={25}
      value={ci}
      onChange={(e: any) => setCi(e.target.value.replace(/[^0-9]/g, "").slice(0, 15))}
    />

    <TextBoxMU
      etiqueta="Nombre"
      ejemplo="Nombre del cliente"
      viewWidth={25}
      value={nombre}
      onChange={(e: any) => setNombre(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "").slice(0, 50))}
    />
  </div>
  <div className={styles.formRow}>
    <TextBoxMU
      etiqueta="Apellido"
      ejemplo="Apellido del cliente"
      viewWidth={25}
      value={apellido}
      onChange={(e: any) => setApellido(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "").slice(0, 50))}
    />
 
    <TextBoxMU
      etiqueta="Email"
      ejemplo="Ej: cliente@email.com"
      viewWidth={25}
      value={email}
      onChange={(e: any) => setEmail(e.target.value.slice(0, 100))}
    />
  </div>
  <div className={styles.formRow}>
    <TextBoxMU
      etiqueta="Teléfono"
      ejemplo="Ej: 0414-1234567"
      viewWidth={22}
      value={telefono1}
      onChange={(e: any) => setTelefono1(e.target.value.replace(/[^0-9-]/g, "").slice(0, 15))}
    />

    <TextBoxMU
      etiqueta="Alternativo"
      ejemplo="Ej: 0424-1234567"
      viewWidth={22}
      value={telefono2}
      onChange={(e: any) => setTelefono2(e.target.value.replace(/[^0-9-]/g, "").slice(0, 15))}
    />
  </div>
  <div className={styles.buttonContainer}>
    <Button texto="Registrar Cliente" viewHeight={7} fuente={3} />
  </div>
</form>
          {mensaje && (
            <div style={{ 
              color: 'green', 
              textAlign: 'center', 
              marginTop: 16,
              padding: '12px',
              backgroundColor: '#f0f9ff',
              border: '1px solid #22c55e',
              borderRadius: '8px'
            }}>
              {mensaje}
            </div>
          )}
          {error && (
            <div style={{ 
              color: 'red', 
              textAlign: 'center', 
              marginTop: 16,
              padding: '12px',
              backgroundColor: '#fef2f2',
              border: '1px solid #ef4444',
              borderRadius: '8px'
            }}>
              {error}
            </div>
          )}
        </div>
      </div>
      {/* Floating Action Button - Back */}
      <button className={styles.backFab} onClick={handleBackClick}>
        <img src={ArrowBack} alt="Volver" style={{ width: 24, height: 24 }} />
      </button>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <div className={styles.popupIcon}>✓</div>
            <h3 className={styles.popupTitle}>¡Cliente Registrado con Éxito!</h3>
            <p className={styles.popupMessage}>
              El cliente con CI: {nuevoClienteCI} ha sido registrado correctamente.
            </p>
            <div className={styles.popupButtons}>
              <button 
                className={styles.popupButtonPrimary}
                onClick={handleViewClientDetail}
              >
                Ver Detalle del Cliente
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

export default RegistrarCliente; 