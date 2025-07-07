import Button from "../../components/Button/button";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./RegistrarEstablecimiento.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBack from '../../assets/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1).svg';
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";


interface Empleado {
    CI_emp: string;
    empleado: string;
    direccion: string;
    sueldo: string;
    Establecimiento: string;
    RIF_establecimiento: string;
}

interface Establecimiento {
    RIF: string;
    nombre: string;
    ciudad: string;
    encargado: string;
    fecha_encargado: string;
}

const RegistrarEstablecimiento: React.FC = () => {
    const navigate = useNavigate();
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([]);
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Empleado | null>(null);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [busquedaEmpleado, setBusquedaEmpleado] = useState("");

    // Estados para el formulario
    const [rifEstablecimiento, setRifEstablecimiento] = useState("");
    const [nombreEstablecimiento, setNombreEstablecimiento] = useState("");
    const [ciudadEstablecimiento, setCiudadEstablecimiento] = useState("");
    const [fechaEncargado, setFechaEncargado] = useState("");

    // Estados para mensajes de error individuales
    const [errorRIF, setErrorRIF] = useState("");
    const [errorNombre, setErrorNombre] = useState("");
    const [errorCiudad, setErrorCiudad] = useState("");
    const [errorEmpleado, setErrorEmpleado] = useState("");
    const [errorFecha, setErrorFecha] = useState("");

    // Estados para el menú de ciudades
    const [menuCiudadesAbierto, setMenuCiudadesAbierto] = useState(false);
    const [busquedaCiudad, setBusquedaCiudad] = useState("");

    // Lista de estados de Venezuela
    const estadosVenezuela = [
        "Amazonas", "Anzoátegui", "Apure", "Aragua", "Barinas", "Bolívar",
        "Carabobo", "Cojedes", "Delta Amacuro", "Distrito Capital", "Falcón",
        "Guárico", "Lara", "Mérida", "Miranda", "Monagas", "Nueva Esparta",
        "Portuguesa", "Sucre", "Táchira", "Trujillo", "Vargas", "Yaracuy", "Zulia"
    ];

    // Fetch de empleados y establecimientos
    useEffect(() => {
        Promise.all([
            fetch("http://localhost:1234/employee"),
            fetch("http://localhost:1234/establishement")
        ])
            .then(responses => Promise.all(responses.map(r => r.json())))
            .then(([empleadosData, establecimientosData]) => {
                if (Array.isArray(empleadosData)) {
                    setEmpleados(empleadosData);
                }
                if (Array.isArray(establecimientosData)) {
                    setEstablecimientos(establecimientosData);
                }
            })
            .catch(error => {
                console.error("Error al cargar datos:", error);
            });
    }, []);

    // Validaciones individuales
    const validarRIF = (rif: string) => {
        if (!rif.trim()) {
            setErrorRIF("El RIF es obligatorio");
            return false;
        }
        if (rif.length < 10) {
            setErrorRIF("El RIF debe tener al menos 10 caracteres");
            return false;
        }
        const establecimientoExistente = establecimientos.find(est =>
            est.RIF.toLowerCase() === rif.toLowerCase()
        );
        if (establecimientoExistente) {
            setErrorRIF(`El establecimiento con RIF ${establecimientoExistente.RIF} ya existe`);
            return false;
        }
        setErrorRIF("");
        return true;
    };

    const validarNombre = (nombre: string) => {
        if (!nombre.trim()) {
            setErrorNombre("El nombre es obligatorio");
            return false;
        }
        if (nombre.length < 3) {
            setErrorNombre("El nombre debe tener al menos 3 caracteres");
            return false;
        }
        setErrorNombre("");
        return true;
    };

    const validarCiudad = (ciudad: string) => {
        if (!ciudad.trim()) {
            setErrorCiudad("La ciudad es obligatoria");
            return false;
        }
        if (ciudad.length < 2) {
            setErrorCiudad("La ciudad debe tener al menos 2 caracteres");
            return false;
        }
        // Verificar si es un estado válido
        const estadoValido = estadosVenezuela.find(estado =>
            estado.toLowerCase() === ciudad.toLowerCase()
        );
        if (!estadoValido) {
            setErrorCiudad("Estado no válido. Seleccione un estado de Venezuela");
            return false;
        }
        setErrorCiudad("");
        return true;
    };

    const validarEmpleado = (empleado: Empleado | null) => {
        if (!empleado) {
            setErrorEmpleado("Debe seleccionar un empleado");
            return false;
        }
        setErrorEmpleado("");
        return true;
    };

    const validarFecha = (fecha: string) => {
        if (!fecha) {
            setErrorFecha("La fecha es obligatoria");
            return false;
        }
        const fechaActual = new Date();
        const fechaSeleccionada = new Date(fecha);
        if (fechaSeleccionada > fechaActual) {
            setErrorFecha("La fecha no puede ser futura");
            return false;
        }
        setErrorFecha("");
        return true;
    };

    // Filtrar empleados basado en la búsqueda
    const empleadosFiltrados = empleados.filter(emp =>
        emp.empleado.toLowerCase().includes(busquedaEmpleado.toLowerCase()) ||
        emp.CI_emp.includes(busquedaEmpleado)
    );

    const seleccionarEmpleado = (empleado: Empleado) => {
        setEmpleadoSeleccionado(empleado);
        setBusquedaEmpleado(empleado.CI_emp);
        setMenuAbierto(false);
        validarEmpleado(empleado);
    };

    // Filtrar ciudades basado en la búsqueda
    const ciudadesFiltradas = estadosVenezuela.filter(ciudad =>
        ciudad.toLowerCase().includes(busquedaCiudad.toLowerCase())
    );

    const seleccionarCiudad = (ciudad: string) => {
        setCiudadEstablecimiento(ciudad);
        setBusquedaCiudad(ciudad);
        setMenuCiudadesAbierto(false);
        validarCiudad(ciudad);
    };

    // Cerrar menú cuando se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (!target.closest(`.${styles.dropdownContainer}`)) {
                setMenuAbierto(false);
                setMenuCiudadesAbierto(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Validaciones en tiempo real
    useEffect(() => {
        if (rifEstablecimiento.trim()) {
            validarRIF(rifEstablecimiento);
        } else {
            setErrorRIF("");
        }
    }, [rifEstablecimiento]);

    useEffect(() => {
        if (nombreEstablecimiento.trim()) {
            validarNombre(nombreEstablecimiento);
        } else {
            setErrorNombre("");
        }
    }, [nombreEstablecimiento]);

    useEffect(() => {
        if (ciudadEstablecimiento.trim()) {
            validarCiudad(ciudadEstablecimiento);
        } else {
            setErrorCiudad("");
        }
    }, [ciudadEstablecimiento]);

    useEffect(() => {
        if (fechaEncargado) {
            validarFecha(fechaEncargado);
        } else {
            setErrorFecha("");
        }
    }, [fechaEncargado]);

    // Función para manejar el regreso
    const handleBackClick = () => {
        navigate('/Search');
    };

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [nuevoEstablecimientoRIF, setNuevoEstablecimientoRIF] = useState<string>("");
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Función para navegar al detalle del establecimiento
    const handleViewEstablecimientoDetail = () => {
        setShowSuccessPopup(false);
        navigate(`/establishement/${nuevoEstablecimientoRIF}`);
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
        // Validaciones
        if (!validarRIF(rifEstablecimiento) || !validarNombre(nombreEstablecimiento) || !validarCiudad(ciudadEstablecimiento) || !validarEmpleado(empleadoSeleccionado) || !validarFecha(fechaEncargado)) {
            setError("Por favor, corrija los errores antes de continuar.");
            return;
        }
        try {
            const res = await fetch(`http://localhost:1234/establishement/`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    RIF: rifEstablecimiento,
                    name: nombreEstablecimiento,
                    city: ciudadEstablecimiento,
                    CI_encargado: empleadoSeleccionado?.CI_emp,
                    fecha_encargado: fechaEncargado
                })
            });
            const data = await res.json();
            if (res.ok) {
                setNuevoEstablecimientoRIF(rifEstablecimiento);
                setShowSuccessPopup(true);
                setRifEstablecimiento(""); setNombreEstablecimiento(""); setCiudadEstablecimiento(""); setEmpleadoSeleccionado(null); setFechaEncargado(""); setBusquedaEmpleado(""); setBusquedaCiudad("");
            } else {
                setError(data.error || data.message || "Error al registrar el establecimiento");
                setTimeout(() => setError(null), 5000);
            }
        } catch (err) {
            setError("Error de conexión con el servidor");
            setTimeout(() => setError(null), 5000);
        }
    };

    return (
        <div>
            <TopBar text="Registrar Establecimiento" menu={false}></TopBar>
            <div className={styles.container}>
                <div className={styles.detailCard}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formRow}>
                            <TextBoxMU
                                etiqueta="RIF"
                                ejemplo="Ej: J-12345678-9"
                                viewWidth={20}
                                value={rifEstablecimiento}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setRifEstablecimiento(e.target.value.replace(/[^A-Za-z0-9-]/g, "").slice(0, 15))
                                }
                            />
                            {errorRIF && <div className={styles.errorField}>{errorRIF}</div>}

                            <TextBoxMU
                                etiqueta="Nombre"
                                ejemplo="Ej: Establecimiento Central"
                                viewWidth={20}
                                value={nombreEstablecimiento}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setNombreEstablecimiento(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "").slice(0, 50))
                                }
                            /></div>
                        {errorNombre && <div className={styles.errorField}>{errorNombre}</div>}

                        <div className={styles.formRow}>
                            <TextBoxMU
                                etiqueta="Ciudad"
                                ejemplo="Buscar estado..."
                                viewWidth={20}
                                value={busquedaCiudad}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setBusquedaCiudad(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "").slice(0, 30));
                                    setMenuCiudadesAbierto(true);
                                }}
                            />
                            <div className={styles.dropdownContainer}>
                                {menuCiudadesAbierto && ciudadesFiltradas.length > 0 && (
                                    <div className={styles.dropdown}>
                                        {ciudadesFiltradas.map((ciudad, index) => (
                                            <div
                                                key={index}
                                                className={styles.dropdownItem}
                                                onClick={() => seleccionarCiudad(ciudad)}
                                            >
                                                {ciudad}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {errorCiudad && <div className={styles.errorField}>{errorCiudad}</div>}
                        
                            <TextBoxMU
                                etiqueta="Empleado Encargado"
                                ejemplo="Buscar empleado..."
                                viewWidth={20}
                                value={busquedaEmpleado}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setBusquedaEmpleado(e.target.value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]/g, "").slice(0, 50));
                                    setMenuAbierto(true);
                                }}
                            />
                            <div className={styles.dropdownContainer}>
                                {menuAbierto && empleadosFiltrados.length > 0 && (
                                    <div className={styles.dropdown}>
                                        {empleadosFiltrados.map((empleado, index) => (
                                            <div
                                                key={index}
                                                className={styles.dropdownItem}
                                                onClick={() => seleccionarEmpleado(empleado)}
                                            >
                                                {empleado.CI_emp} - {empleado.empleado}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {errorEmpleado && <div className={styles.errorField}>{errorEmpleado}</div>}
                        </div>
                        <div className={styles.formRow}>

                            <TextBoxMU  ejemplo=""  viewWidth={0}  etiqueta="Fecha de encargo"></TextBoxMU>
                            <input
                                type="date"
                                className={styles.formInput}
                                value={fechaEncargado}
                                onChange={(e) => setFechaEncargado(e.target.value)}
                            />
                            {errorFecha && <div className={styles.errorField}>{errorFecha}</div>}
                        </div>

                        <div className={styles.centrado}>
                            <Button texto="Registrar Establecimiento" viewHeight={7} fuente={3} />
                        </div>
                    </form>
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
                        <h3 className={styles.popupTitle}>¡Establecimiento Registrado con Éxito!</h3>
                        <p className={styles.popupMessage}>
                            El establecimiento con RIF: {nuevoEstablecimientoRIF} ha sido registrado correctamente.
                        </p>
                        <div className={styles.popupButtons}>
                            <button
                                className={styles.popupButtonPrimary}
                                onClick={handleViewEstablecimientoDetail}
                            >
                                Ver Detalle del Establecimiento
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
}

export default RegistrarEstablecimiento;