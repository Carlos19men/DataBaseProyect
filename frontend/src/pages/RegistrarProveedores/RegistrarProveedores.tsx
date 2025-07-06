import React, { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
import Button from "../../components/Button/button";
import styles from "./RegistrarProveedores.module.css";
import { useNavigate } from "react-router-dom";

const RegistrarProveedores: React.FC = () => {
    const navigate = useNavigate();
    const [rif, setRif] = useState("");
    const [razon, setRazon] = useState("");
    const [local, setLocal] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [contacto, setContacto] = useState("");
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [nuevoProveedorRIF, setNuevoProveedorRIF] = useState<string>("");

    // Función para manejar el regreso
    const handleBackClick = () => {
        navigate('/Search');
    };

    // Función para navegar al detalle del proveedor
    const handleViewProveedorDetail = () => {
        setShowSuccessPopup(false);
        navigate(`/suppliers/${nuevoProveedorRIF}`);
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
        if (!rif || !razon || !local || !direccion || !telefono || !contacto) {
            setError("Por favor, complete todos los campos obligatorios.");
            return;
        }
        try {
            const res = await fetch(`http://localhost:1234/suppliers/${rif}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    razonSo: razon,
                    direccion: direccion,
                    local_: local,
                    telefono: telefono,
                    persona_contacto: contacto
                })
            });
            const data = await res.json();
            if (res.ok) {
                setNuevoProveedorRIF(rif);
                setShowSuccessPopup(true);
                setRif(""); setRazon(""); setLocal(""); setDireccion(""); setTelefono(""); setContacto("");
            } else {
                setError(data.error || data.message || "Error al registrar el proveedor");
            }
        } catch (err) {
            setError("Error de conexión con el servidor");
        }
    };

    return (
        <div>
            <TopBar text="Registrar Proveedor" menu={true} />
            <div className={styles.container}>
                <div className={styles.detailCard}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formRow}>
                            <label className={styles.formLabel}>RIF Proveedor</label>
                            <input
                                className={styles.formInput}
                                type="text"
                                placeholder="Ej: J-12345678-9"
                                value={rif}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRif(e.target.value)}
                            />
                        </div>
                        
                        <div className={styles.formRow}>
                            <label className={styles.formLabel}>Razón Social</label>
                            <input
                                className={styles.formInput}
                                type="text"
                                placeholder="Nombre de la empresa"
                                value={razon}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRazon(e.target.value)}
                            />
                        </div>
                        
                        <div className={styles.formRow}>
                            <label className={styles.formLabel}>Local</label>
                            <input
                                className={styles.formInput}
                                type="text"
                                placeholder="Sucursal principal"
                                value={local}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocal(e.target.value)}
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
                            <label className={styles.formLabel}>Teléfono</label>
                            <input
                                className={styles.formInput}
                                type="text"
                                placeholder="0414-1234567"
                                value={telefono}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelefono(e.target.value)}
                            />
                        </div>
                        
                        <div className={styles.formRow}>
                            <label className={styles.formLabel}>Persona de contacto</label>
                            <input
                                className={styles.formInput}
                                type="text"
                                placeholder="Nombre completo"
                                value={contacto}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContacto(e.target.value)}
                            />
                        </div>
                        
                        <div className={styles.buttonContainer}>
                            <Button texto="Añadir" viewHeight={7} fuente={3} />
                        </div>
                    </form>
                    {mensaje && <div style={{ color: 'green', textAlign: 'center', marginTop: 16 }}>{mensaje}</div>}
                    {error && <div style={{ color: 'red', textAlign: 'center', marginTop: 16 }}>{error}</div>}
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
                        <h3 className={styles.popupTitle}>¡Proveedor Registrado con Éxito!</h3>
                        <p className={styles.popupMessage}>
                            El proveedor con RIF: {nuevoProveedorRIF} ha sido registrado correctamente.
                        </p>
                        <div className={styles.popupButtons}>
                            <button 
                                className={styles.popupButtonPrimary}
                                onClick={handleViewProveedorDetail}
                            >
                                Ver Detalle del Proveedor
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

export default RegistrarProveedores; 