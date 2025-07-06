import React, { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/button";
import styles from "./RegistrarCliente.module.css";
import { useNavigate } from "react-router-dom";

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

  // Función para manejar el regreso
  const handleBackClick = () => {
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
          telefono1: telefono1,
          telefono2: telefono2
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        setMensaje("Cliente registrado correctamente.");
        // Limpiar formulario
        setCi(""); 
        setNombre(""); 
        setApellido(""); 
        setEmail(""); 
        setTelefono1(""); 
        setTelefono2("");
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setMensaje(null), 3000);
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
              <label className={styles.formLabel}>Cédula de Identidad</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Ej: 12345678"
                value={ci}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCi(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Nombre</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Nombre del cliente"
                value={nombre}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Apellido</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Apellido del cliente"
                value={apellido}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApellido(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Correo Electrónico</label>
              <input
                className={styles.formInput}
                type="email"
                placeholder="Ej: cliente@email.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Teléfono Principal</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Ej: 0414-1234567"
                value={telefono1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelefono1(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Teléfono Secundario</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Ej: 0424-1234567"
                value={telefono2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelefono2(e.target.value)}
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
        ←
      </button>
    </div>
  );
};

export default RegistrarCliente; 