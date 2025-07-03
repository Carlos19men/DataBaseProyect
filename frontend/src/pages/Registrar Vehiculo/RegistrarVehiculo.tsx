import React, { useState, useEffect } from "react";
import Button from "../../components/Button/button";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./RegistrarVehiculo.module.css";

const RegistrarVehiculo: React.FC = () => {
    const [placa, setPlaca] = useState("");
    const [cedula, setCedula] = useState("");
    const [dueno, setDueno] = useState("");
    const [tiempoUso, setTiempoUso] = useState("");
    const [kilometraje, setKilometraje] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [aceite, setAceite] = useState("");
    const [plan, setPlan] = useState("");
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Para selects dinámicos
    const [marcas, setMarcas] = useState<{cod_marca: number, nombre_marca: string}[]>([]);
    const [modelos, setModelos] = useState<{cod_modelo: number, modelo: string}[]>([]);
    const [loadingMarcas, setLoadingMarcas] = useState(false);
    const [loadingModelos, setLoadingModelos] = useState(false);

    useEffect(() => {
        setLoadingMarcas(true);
        fetch("http://localhost:1234/brand/")
            .then(res => res.json())
            .then(data => setMarcas(data))
            .catch(() => setMarcas([]))
            .finally(() => setLoadingMarcas(false));
    }, []);

    useEffect(() => {
        if (marca) {
            setLoadingModelos(true);
            fetch(`http://localhost:1234/model/${marca}`)
                .then(res => res.json())
                .then(data => setModelos(data))
                .catch(() => setModelos([]))
                .finally(() => setLoadingModelos(false));
        } else {
            setModelos([]);
            setModelo("");
        }
    }, [marca]);

    return (
        <div className={styles.body}>
            <TopBar text="Registrar Vehículo" menu={true} />
            <form className={styles.centrado}>
                <div className={styles.container}>
                    <div className={styles.formRow}>
                        <TextBoxMU etiqueta="Placa del Vehículo:" value={placa} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaca(e.target.value)} viewWidth={20} ejemplo="ABC123" />
                        <TextBoxMU etiqueta="Cédula de Identidad del dueño:" value={cedula} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCedula(e.target.value)} viewWidth={20} ejemplo="V-12345678" />
                        <TextBoxMU etiqueta="Nombre del dueño:" value={dueno} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueno(e.target.value)} viewWidth={20} ejemplo="Nombre completo" />
                    </div>
                    <div className={styles.formRow}>
                        <TextBoxMU etiqueta="Tiempo de Uso (horas):" value={tiempoUso} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTiempoUso(e.target.value)} viewWidth={20} ejemplo="1000" />
                        <TextBoxMU etiqueta="Kilometraje:" value={kilometraje} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKilometraje(e.target.value)} viewWidth={20} ejemplo="50000" />
                    </div>
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
                        <span className={styles.textBoxContainer}>
                            <span className={styles.texto}>Modelo:</span>
                            <select className={styles.select} value={modelo} onChange={e => setModelo(e.target.value)} required disabled={!marca || loadingModelos}>
                                <option value="">{loadingModelos ? "Cargando..." : "Seleccione un modelo"}</option>
                                {modelos.map(m => (
                                    <option key={m.cod_modelo} value={m.cod_modelo}>{m.modelo}</option>
                                ))}
                            </select>
                        </span>
                    </div>
                    <div className={styles.formRow}>
                        <span className={styles.textBoxContainer}>
                            <span className={styles.texto}>Tipo de Aceite usado:</span>
                            <select className={styles.select} value={aceite} onChange={e => setAceite(e.target.value)} required>
                                <option value="">Seleccione el tipo de aceite</option>
                                <option value="Sintético">Sintético</option>
                                <option value="Mineral">Mineral</option>
                                <option value="Semi-sintético">Semi-sintético</option>
                            </select>
                        </span>
                    </div>
                    <div className={styles.formRow} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <label className={styles.label}>Plan de Mantenimiento:</label>
                        <textarea
                            className={styles.textarea}
                            value={plan}
                            onChange={e => setPlan(e.target.value)}
                            placeholder="Describa el plan de mantenimiento..."
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

export default RegistrarVehiculo; 