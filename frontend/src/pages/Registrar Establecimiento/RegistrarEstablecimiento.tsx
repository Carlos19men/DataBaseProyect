import Button from "../../components/Button/button";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./RegistrarEstablecimiento.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

    return(
        <div>
            <TopBar text="Registrar Establecimiento" menu={false}></TopBar>
            <div className={styles.container}>
                <div className={styles.detailCard}>
                    <form className={styles.form}>
                        <div className={styles.formRow}>
                            <label className={styles.formLabel}>RIF del Establecimiento</label>
                            <input
                                className={styles.formInput}
                                type="text"
                                placeholder="Ej: J-12345678-9"
                                value={rifEstablecimiento}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRifEstablecimiento(e.target.value)}
                            />
                            {errorRIF && <div className={styles.errorField}>{errorRIF}</div>}
                        </div>
                        
                        <div className={styles.formRow}>
                            <label className={styles.formLabel}>Nombre</label>
                            <input
                                className={styles.formInput}
                                type="text"
                                placeholder="Ej: Establecimiento Central"
                                value={nombreEstablecimiento}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombreEstablecimiento(e.target.value)}
                            />
                            {errorNombre && <div className={styles.errorField}>{errorNombre}</div>}
                        </div>
                        
                        <div className={styles.formRow}>
                            <label className={styles.formLabel}>Ciudad</label>
                            <div className={styles.dropdownContainer}>
                                <input
                                    className={styles.formInput}
                                    type="text"
                                    placeholder="Buscar estado..."
                                    value={busquedaCiudad}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setBusquedaCiudad(e.target.value);
                                        setMenuCiudadesAbierto(true);
                                    }}
                                />
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
                        </div>
                        
                        <div className={styles.formRow}>
                            <label className={styles.formLabel}>Empleado Encargado</label>
                            <div className={styles.dropdownContainer}>
                                <input
                                    className={styles.formInput}
                                    type="text"
                                    placeholder="Buscar empleado..."
                                    value={busquedaEmpleado}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setBusquedaEmpleado(e.target.value);
                                        setMenuAbierto(true);
                                    }}
                                />
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
                            <label className={styles.formLabel}>Fecha de Encargo</label>
                            <input
                                type="date"
                                className={styles.formInput}
                                value={fechaEncargado}
                                onChange={(e) => setFechaEncargado(e.target.value)}
                            />
                            {errorFecha && <div className={styles.errorField}>{errorFecha}</div>}
                        </div>
                        
                        <div className={styles.buttonContainer}>
                            <Button texto="Registrar Establecimiento" viewHeight={7} fuente={3} />
                        </div>
                    </form>
                </div>
            </div>
            {/* Floating Action Button - Back */}
            <button className={styles.backFab} onClick={handleBackClick}>
                ←
            </button>
        </div>
    );
}

export default RegistrarEstablecimiento;