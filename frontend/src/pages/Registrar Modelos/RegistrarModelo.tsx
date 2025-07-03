import React, { useState, useEffect } from "react";
import Button from "../../components/Button/button";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./RegistrarModelo.module.css";

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

    // Marcas dinámicas
    const [marcas, setMarcas] = useState<{cod_marca: number, nombre_marca: string}[]>([]);
    const [loadingMarcas, setLoadingMarcas] = useState(false);

    useEffect(() => {
        setLoadingMarcas(true);
        fetch("http://localhost:1234/brand/")
            .then(res => res.json())
            .then(data => setMarcas(data))
            .catch(() => setMarcas([]))
            .finally(() => setLoadingMarcas(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje(null);
        setError(null);
        if (!marca) {
            setError("Debe seleccionar una marca válida.");
            return;
        }
        try {
            const res = await fetch(`http://localhost:1234/model/`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_marca: parseInt(marca),
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
                setMarca(""); setNumeroModelo(""); setAceiteCaja(""); setAceiteMotor(""); setTipoRefrigerante(""); setPeso(""); setOctanaje(""); setCantidadAsientos(""); setDescripcion("");
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
                            <select className={styles.select} value={marca} onChange={e => setMarca(e.target.value)} required disabled={loadingMarcas}>
                                <option value="">{loadingMarcas ? "Cargando..." : "Seleccione una marca"}</option>
                                {marcas.map(m => (
                                    <option key={m.cod_marca} value={m.cod_marca}>{m.nombre_marca}</option>
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
                        <span className={styles.textBoxContainer}>
                            <span className={styles.texto}>Octanaje:</span>
                            <select className={styles.select} value={octanaje} onChange={e => setOctanaje(e.target.value)} required>
                                <option value="">Seleccione</option>
                                <option value="87">87</option>
                                <option value="91">91</option>
                                <option value="95">95</option>
                                <option value="98">98</option>
                            </select>
                        </span>
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