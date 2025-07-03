import React, { useState } from "react";
import Button from "../../components/Button/button";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./RegistrarModelo.module.css";

// Relación de marcas a su id (esto debería venir de la API en producción)
const marcas = [
    { value: "", label: "Seleccione una marca", id: "" },
    { value: "Toyota", label: "Toyota", id: 1 },
    { value: "Ford", label: "Ford", id: 2 },
    { value: "Chevrolet", label: "Chevrolet", id: 3 },
];

const RegistrarModelo: React.FC = () => {
    const [marca, setMarca] = useState("");
    const [numeroModelo, setNumeroModelo] = useState("");
    const [aceiteCaja, setAceiteCaja] = useState("");
    const [aceiteMotor, setAceiteMotor] = useState("");
    const [tipoRefrigerante, setTipoRefrigerante] = useState("");
    const [peso, setPeso] = useState("");
    const [octanaje, setOctanaje] = useState("");
    const [cantidadAsientos, setCantidadAsientos] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje(null);
        setError(null);
        // Buscar el id de la marca seleccionada
        const marcaObj = marcas.find(m => m.value === marca);
        if (!marcaObj || !marcaObj.id) {
            setError("Debe seleccionar una marca válida.");
            return;
        }
        try {
            const res = await fetch(`http://localhost:1234/model/${marcaObj.id}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: numeroModelo,
                    aceite_caja: aceiteCaja,
                    aceite_motor: aceiteMotor,
                    octanaje: octanaje,
                    tipo_refrigerante: tipoRefrigerante,
                    peso_str: peso,
                    descripcion: descripcion,
                    nro_puesto_str: cantidadAsientos
                })
            });
            const data = await res.json();
            if (res.ok) {
                setMensaje("Modelo registrado correctamente.");
                // Limpiar campos
                setMarca("");
                setNumeroModelo("");
                setAceiteCaja("");
                setAceiteMotor("");
                setTipoRefrigerante("");
                setPeso("");
                setOctanaje("");
                setCantidadAsientos("");
                setDescripcion("");
            } else {
                setError(data.error || data.message || "Error al registrar el modelo");
            }
        } catch (err) {
            setError("Error de conexión con el servidor");
        }
    };

    return (
        <div className={styles.body}>
            <TopBar text="Registrar Modelo" menu={true} />
            <form className={styles.centrado} onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <div className={styles.formRow}>
                        <span className={styles.textBoxContainer}>
                            <span className={styles.texto}>Marca:</span>
                            <select className={styles.select} value={marca} onChange={e => setMarca(e.target.value)} required>
                                {marcas.map(m => (
                                    <option key={m.value} value={m.value}>{m.label}</option>
                                ))}
                            </select>
                        </span>
                        <TextBoxMU etiqueta="Número de modelo:" value={numeroModelo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumeroModelo(e.target.value)} viewWidth={20} ejemplo="Ej: 2024" />
                    </div>
                    <div className={styles.formRow}>
                        <TextBoxMU etiqueta="Aceite de la caja:" value={aceiteCaja} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAceiteCaja(e.target.value)} viewWidth={20} ejemplo="Ej: ATF" />
                        <TextBoxMU etiqueta="Peso:" value={peso} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPeso(e.target.value)} viewWidth={20} ejemplo="Ej: 1200" />
                    </div>
                    <div className={styles.formRow}>
                        <TextBoxMU etiqueta="Aceite del motor:" value={aceiteMotor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAceiteMotor(e.target.value)} viewWidth={20} ejemplo="Ej: 10W-40" />
                        <TextBoxMU etiqueta="Octanaje:" value={octanaje} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOctanaje(e.target.value)} viewWidth={20} ejemplo="Ej: 95" />
                    </div>
                    <div className={styles.formRow}>
                        <TextBoxMU etiqueta="Tipo de Refrigerante:" value={tipoRefrigerante} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTipoRefrigerante(e.target.value)} viewWidth={20} ejemplo="Ej: G12" />
                        <TextBoxMU etiqueta="Cantidad de asientos:" value={cantidadAsientos} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCantidadAsientos(e.target.value)} viewWidth={20} ejemplo="Ej: 5" />
                    </div>
                    <div className={styles.formRow} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <label className={styles.label}>Descripcion:</label>
                        <textarea
                            className={styles.textarea}
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                            placeholder="Descripción del modelo"
                            required
                        />
                    </div>
                    {mensaje && <div style={{ color: 'green', gridColumn: '1 / span 2', textAlign: 'center' }}>{mensaje}</div>}
                    {error && <div style={{ color: 'red', gridColumn: '1 / span 2', textAlign: 'center' }}>{error}</div>}
                    <div className={styles.buttonContainer}>
                        <Button texto="Registrar" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegistrarModelo; 