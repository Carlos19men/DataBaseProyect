import React, { useState, useEffect } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/button";
import styles from "./RegistrarEmpleado.module.css";
import { useNavigate } from "react-router-dom";
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [nuevoEmpleadoCI, setNuevoEmpleadoCI] = useState<string>("");

  // Función para manejar el regreso
  const handleBackClick = () => {
    navigate('/Search');
  };

  // Función para navegar al detalle del empleado
  const handleViewEmpleadoDetail = () => {
    setShowSuccessPopup(false);
    navigate(`/employee/${nuevoEmpleadoCI}`);
  };

  // Función para cerrar el popup
  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    navigate('/Search');
  };

  useEffect(() => {
    // Cargar establecimientos disponibles
    fetch("http://localhost:1234/establishement")
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
        setNuevoEmpleadoCI(ci);
        setShowSuccessPopup(true);
        // Limpiar formulario
        setCi("");
        setNombre("");
        setApellido("");
        setTelefono("");
        setDireccion("");
        setSueldo("");
        setRifEstablecimiento("");
      } else {
        setError(data.error || data.message || "Error al registrar el empleado");
        setTimeout(() => setError(null), 5000);
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
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
              <TextBoxMU
                etiqueta="Cédula "
                ejemplo="Ej: 12345678"
                viewWidth={25}
                value={ci}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCi(e.target.value.replace(/[^0-9]/g, "").slice(0, 15))
                }
              />

              <TextBoxMU
                etiqueta="Nombre"
                ejemplo="Nombre del empleado"
                viewWidth={25}
                value={nombre}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNombre(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "").slice(0, 50))
                }
              />
            </div>
            <div className={styles.formRow}>
              <TextBoxMU
                etiqueta="Apellido"
                ejemplo="Apellido del empleado"
                viewWidth={25}
                value={apellido}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setApellido(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "").slice(0, 50))
                }
              />

              <TextBoxMU
                etiqueta="Teléfono"
                ejemplo="Ej: 04141234567"
                viewWidth={25}
                value={telefono}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTelefono(e.target.value.replace(/[^0-9]/g, "").slice(0, 15))
                }
              />
            </div>
            <div className={styles.formRow}>
              <TextBoxMU
                etiqueta="Dirección"
                ejemplo="Dirección completa"
                viewWidth={25}
                value={direccion}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDireccion(e.target.value.slice(0, 150))
                }
              />

              <TextBoxMU
                etiqueta="Sueldo"
                ejemplo="Ej: 800"
                viewWidth={25}
                value={sueldo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSueldo(e.target.value.replace(/[^0-9]/g, "").slice(0, 9))
                }
              />
            </div>
            <div className={styles.formRow}>
              <TextBoxMU etiqueta="Establecimiento" ejemplo="" viewWidth={0} />
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
              <div className={styles.helpText}>
                ¿No encuentra el establecimiento?
                <button
                  type="button"
                  className={styles.linkButton}
                  onClick={() => navigate('/RegistrarEstablecimiento')}
                >
                  Regístrelo aquí
                </button>
              </div>
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
        <img src={ArrowBack} alt="Volver" style={{ width: 24, height: 24 }} />
      </button>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <div className={styles.popupIcon}>✓</div>
            <h3 className={styles.popupTitle}>¡Empleado Registrado con Éxito!</h3>
            <p className={styles.popupMessage}>
              El empleado con CI: {nuevoEmpleadoCI} ha sido registrado correctamente.
            </p>
            <div className={styles.popupButtons}>
              <button
                className={styles.popupButtonPrimary}
                onClick={handleViewEmpleadoDetail}
              >
                Ver Detalle del Empleado
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

export default RegistrarEmpleado; 