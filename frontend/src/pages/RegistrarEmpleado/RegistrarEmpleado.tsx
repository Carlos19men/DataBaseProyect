import React, { useState, useEffect } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/button";
import styles from "./RegistrarEmpleado.module.css";
import { useNavigate } from "react-router-dom";

interface Establecimiento {
  RIF: string;
  nombre: string;
}

const RegistrarEmpleado: React.FC = () => {
  const navigate = useNavigate();
  const [ci, setCi] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [sueldo, setSueldo] = useState("");
  const [rifEstablecimiento, setRifEstablecimiento] = useState("");
  const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Función para manejar el regreso
  const handleBackClick = () => {
    navigate('/Search');
  };

  useEffect(() => {
    // Cargar establecimientos disponibles
    fetch("http://localhost:1234/establishments/")
      .then(res => res.json())
      .then(data => setEstablecimientos(data))
      .catch(() => setEstablecimientos([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    
    if (!ci || !nombre || !apellido || !telefono || !direccion || !sueldo || !rifEstablecimiento) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:1234/employee/`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          CI: ci,
          name: nombre,
          lastName: apellido,
          cellphone: telefono,
          address: direccion,
          salary: parseInt(sueldo),
          RIF: rifEstablecimiento
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        setMensaje("Empleado registrado correctamente.");
        // Limpiar formulario
        setCi(""); 
        setNombre(""); 
        setApellido(""); 
        setTelefono(""); 
        setDireccion(""); 
        setSueldo(""); 
        setRifEstablecimiento("");
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setMensaje(null), 3000);
      } else {
        setError(data.error || data.message || "Error al registrar el empleado");
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
      <TopBar text="Registrar Empleado" menu={true} />
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
                placeholder="Nombre del empleado"
                value={nombre}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Apellido</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Apellido del empleado"
                value={apellido}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApellido(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Teléfono</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Ej: 0414-1234567"
                value={telefono}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelefono(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Dirección</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Dirección completa"
                value={direccion}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDireccion(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Sueldo</label>
              <input
                className={styles.formInput}
                type="number"
                placeholder="Ej: 800"
                value={sueldo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSueldo(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Establecimiento</label>
              <select
                className={styles.formInput}
                value={rifEstablecimiento}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRifEstablecimiento(e.target.value)}
              >
                <option value="">Seleccione un establecimiento</option>
                {establecimientos.map(est => (
                  <option key={est.RIF} value={est.RIF}>{est.RIF} - {est.nombre}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.buttonContainer}>
              <Button texto="Registrar Empleado" viewHeight={7} fuente={3} />
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

export default RegistrarEmpleado; 