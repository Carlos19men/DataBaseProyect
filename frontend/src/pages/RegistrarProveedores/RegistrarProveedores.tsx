import React, { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
import Button from "../../components/Button/button";
import styles from "./RegistrarProveedores.module.css";

const RegistrarProveedores: React.FC = () => {
    const [rif, setRif] = useState("");
    const [razon, setRazon] = useState("");
    const [local, setLocal] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [contacto, setContacto] = useState("");
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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
                setMensaje("Proveedor registrado correctamente.");
                setRif(""); setRazon(""); setLocal(""); setDireccion(""); setTelefono(""); setContacto("");
            } else {
                setError(data.error || data.message || "Error al registrar el proveedor");
            }
        } catch (err) {
            setError("Error de conexión con el servidor");
        }
    };

    return (
        <div className={styles.body}>
            <TopBar text="Registrar Proveedor" menu={true} />
            <div className={styles.centrado}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        <TextBoxMU etiqueta="RIF Proveedor:" value={rif} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRif(e.target.value)} viewWidth={18} ejemplo="Ej: J-12345678-9" />
                        <TextBoxMU etiqueta="Razón Social:" value={razon} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRazon(e.target.value)} viewWidth={18} ejemplo="Nombre de la empresa" />
                    </div>
                    <div className={styles.formRow}>
                        <TextBoxMU etiqueta="Local:" value={local} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocal(e.target.value)} viewWidth={18} ejemplo="Sucursal principal" />
                        <TextBoxMU etiqueta="Direccion:" value={direccion} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDireccion(e.target.value)} viewWidth={18} ejemplo="Dirección completa" />
                    </div>
                    <div className={styles.formRow}>
                        <TextBoxMU etiqueta="Telefono:" value={telefono} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelefono(e.target.value)} viewWidth={18} ejemplo="0414-1234567" />
                        <TextBoxMU etiqueta="Persona de contacto:" value={contacto} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContacto(e.target.value)} viewWidth={18} ejemplo="Nombre completo" />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button texto="Añadir" viewHeight={7} fuente={3} />
                    </div>
                </form>
            </div>
            {mensaje && <div style={{ color: 'green', textAlign: 'center', marginTop: 16 }}>{mensaje}</div>}
            {error && <div style={{ color: 'red', textAlign: 'center', marginTop: 16 }}>{error}</div>}
        </div>
    );
};

export default RegistrarProveedores; 