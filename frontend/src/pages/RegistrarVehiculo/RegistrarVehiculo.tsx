import React, { useState, useEffect } from "react";
import Button from "../../components/Button/button";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./RegistrarVehiculo.module.css";
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';

const RegistrarVehiculo: React.FC = () => {
    const [placa, setPlaca] = useState("");
    const [cedula, setCedula] = useState("");
    const [dueno, setDueno] = useState("");
    const [tiempoUso, setTiempoUso] = useState("");
    const [kilometraje, setKilometraje] = useState("");
    const [marca, setMarca] = useState<number | "">("");
    const [modelo, setModelo] = useState<number | "">("");
    const [aceite, setAceite] = useState("");
    const [plan, setPlan] = useState("");
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

const [clientes, setClientes] = useState<{ ci: string, nombre: string, apellido: string }[]>([]);

useEffect(() => {
    fetch("http://localhost:1234/clientes/")
        .then(res => res.json())
        .then(data => setClientes(data))
        .catch(() => setClientes([]));
}, []);

    // Para selects dinámicos
    const [marcas, setMarcas] = useState<{ cod_marca: number, nombre_marca: string }[]>([]);
    const [modelos, setModelos] = useState<{ cod_modelo: number, modelo: string }[]>([]);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje(null);
        setError(null);
        // Validación básica
        if (!placa || !cedula || !dueno || !tiempoUso || !kilometraje || !marca || !modelo || !aceite) {
            setError("Por favor, complete todos los campos obligatorios.");
            return;
        }
          if (!clientes.some(c => c.ci === cedula)) {
        setError("La cédula ingresada no corresponde a un cliente registrado.");
        return;
    }
        try {
            const res = await fetch("http://localhost:1234/vehicles/", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    plate: placa,
                    oil_box: aceite,
                    oil_motor: aceite,
                    maintenance: plan,
                    months_use: parseInt(tiempoUso),
                    mileage: parseFloat(kilometraje),
                    id_model: typeof modelo === 'number' ? modelo : parseInt(modelo as any),
                    id_marca: typeof marca === 'number' ? marca : parseInt(marca as any),
                    CI_owner: cedula
                })
            });
            const data = await res.json();
            if (res.ok) {
                setMensaje("Vehículo registrado correctamente.");
                // Limpiar campos
                setPlaca(""); setCedula(""); setDueno(""); setTiempoUso(""); setKilometraje(""); setMarca(""); setModelo(""); setAceite(""); setPlan("");
            } else {
                setError(data.error || data.message || "Error al registrar el vehículo");
            }
        } catch (err) {
            setError("Dueño no registrado. Inserte una cédula de identidad válida.");
        }
    };

    return (
        <div className={styles.body}>
            <TopBar text="Registrar Vehículo" menu={true} />
            <form className={styles.centrado} onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <div className={styles.formRow}>
                        <TextBoxMU
                            etiqueta="Placa del Vehículo:"
                            value={placa}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setPlaca(e.target.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 10))
                            }
                            viewWidth={15}
                            ejemplo="ABC123"
                        />
                        <TextBoxMU
                            etiqueta="CI del dueño:"
                            value={cedula}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setCedula(e.target.value.replace(/[^0-9]/g, "").slice(0, 15))
                            }
                            viewWidth={15}
                            ejemplo="12345678"
                        />
                    </div>
                    <div className={styles.formRow}>
                        <TextBoxMU
                            etiqueta="Nombre del dueño:"
                            value={dueno}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setDueno(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "").slice(0, 50))
                            }
                            viewWidth={15}
                            ejemplo="Nombre completo"
                        />
                        <TextBoxMU
                            etiqueta="Horas de Uso :"
                            value={tiempoUso}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setTiempoUso(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))
                            }
                            viewWidth={20}
                            ejemplo="1000"
                        />
                    </div>
                    <div className={styles.formRow}>
                        <span className={styles.textBoxContainer}>
                            <TextBoxMU
                                etiqueta="Kilometraje:"
                                value={kilometraje}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setKilometraje(e.target.value.replace(/[^0-9]/g, "").slice(0, 7))
                                }
                                viewWidth={22}
                                ejemplo="50000"
                            />
                            <TextBoxMU etiqueta="Marca:" viewWidth={0} ejemplo="" />
                            <select
                                className={styles.select}
                                value={marca}
                                onChange={e => { setMarca(Number(e.target.value) || ""); setModelo(""); }}
                                required
                                disabled={loadingMarcas}
                            >
                                <option value="">{loadingMarcas ? "Cargando..." : "Seleccione una marca"}</option>
                                {marcas.map(m => (
                                    <option key={m.cod_marca} value={m.cod_marca}>{m.nombre_marca}</option>
                                ))}
                            </select>
                        </span>
                        <span className={styles.textBoxContainer}>
                            <TextBoxMU etiqueta="Modelo:" viewWidth={0} ejemplo="" />
                            <select
                                className={styles.select}
                                value={modelo}
                                onChange={e => setModelo(Number(e.target.value) || "")}
                                required
                                disabled={!marca || loadingModelos}
                            >
                                <option value="">{loadingModelos ? "Cargando..." : "Seleccione un modelo"}</option>
                                {modelos.map(m => (
                                    <option key={m.cod_modelo} value={m.cod_modelo}>{m.modelo}</option>
                                ))}
                            </select>
                        </span>
                        <span className={styles.textBoxContainer}>
                            <TextBoxMU etiqueta="Aceite usado:" viewWidth={0} ejemplo="" />
                            <select
                                className={styles.select}
                                value={aceite}
                                onChange={e => setAceite(e.target.value)}
                                required
                            >
                                <option value="">Seleccione el tipo de aceite</option>
                                <option value="Sintético">Sintético</option>
                                <option value="Mineral">Mineral</option>
                                <option value="Semi-sintético">Semi-sintético</option>
                            </select>
                        </span>
                    </div>
                    <div className={styles.formRow} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <TextBoxMU etiqueta="Plan de mantenimiento:" viewWidth={0} ejemplo="" />
                        <textarea
                            className={styles.textarea}
                            value={plan}
                            onChange={e => setPlan(e.target.value.slice(0, 200))}
                            placeholder="Describa el plan de mantenimiento..."
                            required
                        />
                        <div className={styles.centrado}>
                            <Button texto="Registrar Vehículo"  />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegistrarVehiculo; 