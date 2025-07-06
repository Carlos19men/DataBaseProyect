import React, { useState, useEffect } from "react";
import styles from "./RegistrarOrdenServicio.module.css";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/button";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";

interface Establecimiento {
  RIF: string;
  nombre: string;
  ciudad: string;
  encargado: string;
  CI_encargado: string;
  fecha_encargado: string;
}

interface Servicio {
  nro_servicio: number;
  nombre_ser: string;
}

interface Actividad {
  nro_servicio: number;
  nro_correlativo: number;
  nombre: string;
  descripcion: string;
  costo: number;
}

interface ServiceActivity {
  nro_servicio: number;
  nro_correlativo: number;
  id_producto: number;
  precio_producto: number;
  precio_actividad: number;
  cantidad_producto: number;
  ci_empleAsig: string;
}

// Definir un tipo extendido para actividades seleccionadas
interface ActividadSeleccionada extends Actividad {
  id_producto: number;
  cantidad_producto: number;
  precio_producto: number;
  ci_empleAsig: string;
}

const RegistrarOrdenServicio = () => {
  // Estados para los datos
  const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [actividades, setActividades] = useState<Actividad[]>([]);
  
  // Estados para las selecciones
  const [establecimientoSeleccionado, setEstablecimientoSeleccionado] = useState<string>("");
  const [servicioSeleccionado, setServicioSeleccionado] = useState<string>("");
  const [actividadSeleccionada, setActividadSeleccionada] = useState<string>("");
  
  // Estados para las listas seleccionadas
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<Servicio[]>([]);
  const [actividadesSeleccionadas, setActividadesSeleccionadas] = useState<ActividadSeleccionada[]>([]);
  
  // Estados de carga
  const [cargandoEstablecimientos, setCargandoEstablecimientos] = useState(false);
  const [cargandoServicios, setCargandoServicios] = useState(false);
  const [cargandoActividades, setCargandoActividades] = useState(false);
  const [enviandoOrden, setEnviandoOrden] = useState(false);

  // Estados para los campos del formulario
  const [placaVehiculo, setPlacaVehiculo] = useState("");
  const [fechaEntradaDD, setFechaEntradaDD] = useState("");
  const [fechaEntradaMM, setFechaEntradaMM] = useState("");
  const [fechaEntradaAA, setFechaEntradaAA] = useState("");
  const [horaEntradaHH, setHoraEntradaHH] = useState("");
  const [horaEntradaMM, setHoraEntradaMM] = useState("");
  const [fechaSalidaDD, setFechaSalidaDD] = useState("");
  const [fechaSalidaMM, setFechaSalidaMM] = useState("");
  const [fechaSalidaAA, setFechaSalidaAA] = useState("");
  const [horaEstimadaSalidaHH, setHoraEstimadaSalidaHH] = useState("");
  const [horaEstimadaSalidaMM, setHoraEstimadaSalidaMM] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [personaAutorizada, setPersonaAutorizada] = useState("");

  // Estado para las relaciones producto-actividad
  const [relacionesActividadProducto, setRelacionesActividadProducto] = useState<any[]>([]);

  // Cargar establecimientos al montar el componente
  useEffect(() => {
    const cargarEstablecimientos = async () => {
      setCargandoEstablecimientos(true);
      try {
        const response = await fetch('http://localhost:1234/establishement/');
        if (response.ok) {
          const data = await response.json();
          setEstablecimientos(data);
        } else {
          console.error('Error al cargar establecimientos');
        }
      } catch (error) {
        console.error('Error al cargar establecimientos:', error);
      } finally {
        setCargandoEstablecimientos(false);
      }
    };

    cargarEstablecimientos();
  }, []);

  // Cargar servicios cuando se selecciona un establecimiento
  useEffect(() => {
    if (establecimientoSeleccionado) {
      const cargarServicios = async () => {
        setCargandoServicios(true);
        try {
          const response = await fetch(`http://localhost:1234/offered-services/rif/${establecimientoSeleccionado}`);
          if (response.ok) {
            const data = await response.json();
            setServicios(data);
          } else {
            console.error('Error al cargar servicios');
            setServicios([]);
          }
        } catch (error) {
          console.error('Error al cargar servicios:', error);
          setServicios([]);
        } finally {
          setCargandoServicios(false);
        }
      };

      cargarServicios();
    } else {
      setServicios([]);
    }
    setServicioSeleccionado("");
    setActividadSeleccionada("");
    setActividades([]);
  }, [establecimientoSeleccionado]);

  // Cargar actividades cuando se selecciona un servicio
  useEffect(() => {
    if (servicioSeleccionado) {
      const cargarActividades = async () => {
        setCargandoActividades(true);
        try {
          const response = await fetch(`http://localhost:1234/activity/servicio/${servicioSeleccionado}`);
          if (response.ok) {
            const data = await response.json();
            setActividades(data);
          } else {
            console.error('Error al cargar actividades');
            setActividades([]);
          }
        } catch (error) {
          console.error('Error al cargar actividades:', error);
          setActividades([]);
        } finally {
          setCargandoActividades(false);
        }
      };

      cargarActividades();
    } else {
      setActividades([]);
    }
    setActividadSeleccionada("");
  }, [servicioSeleccionado]);

  // Cargar todas las relaciones producto-actividad al montar el componente
  useEffect(() => {
    const cargarRelaciones = async () => {
      try {
        const response = await fetch("http://localhost:1234/activity-product/");
        if (response.ok) {
          const data = await response.json();
          setRelacionesActividadProducto(data);
        }
      } catch (error) {
        setRelacionesActividadProducto([]);
      }
    };
    cargarRelaciones();
  }, []);

  // Función para agregar servicio seleccionado
  const agregarServicio = () => {
    if (servicioSeleccionado && !serviciosSeleccionados.find(s => s.nro_servicio.toString() === servicioSeleccionado)) {
      const servicio = servicios.find(s => s.nro_servicio.toString() === servicioSeleccionado);
      if (servicio) {
        setServiciosSeleccionados([...serviciosSeleccionados, servicio]);
        setServicioSeleccionado("");
      }
    }
  };

  // Función para agregar actividad seleccionada
  const agregarActividad = async () => {
    if (
      actividadSeleccionada &&
      !actividadesSeleccionadas.find(
        (a) =>
          a.nro_servicio === Number(servicioSeleccionado) &&
          a.nro_correlativo === Number(actividadSeleccionada)
      )
    ) {
      const actividad = actividades.find(
        (a) => a.nro_correlativo === Number(actividadSeleccionada)
      );
      if (actividad) {
        // Buscar en /activity-product/ todas las relaciones
        try {
          const response = await fetch("http://localhost:1234/activity-product/");
          if (response.ok) {
            const relaciones = await response.json();
            // Buscar la relación para esta actividad
            const relacion = relaciones.find(
              (rel: any) =>
                rel.nro_servicio === actividad.nro_servicio &&
                rel.nro_correlativo === actividad.nro_correlativo
            );
            if (relacion) {
              // Buscar el precio del producto
              const responseProd = await fetch(
                `http://localhost:1234/product`
              );
              let precio_producto = 0;
              if (responseProd.ok) {
                const productos = await responseProd.json();
                const producto = productos.find(
                  (p: any) => p.id_producto === relacion.id_producto
                );
                if (producto) {
                  precio_producto = producto.precio;
                }
              }
              // Guardar la actividad con los datos completos y los IDs numéricos
              setActividadesSeleccionadas([
                ...actividadesSeleccionadas,
                {
                  ...actividad,
                  nro_servicio: Number(actividad.nro_servicio),
                  nro_correlativo: Number(actividad.nro_correlativo),
                  id_producto: Number(relacion.id_producto),
                  cantidad_producto: Number(relacion.cant_utilizada),
                  precio_producto: Number(precio_producto),
                  ci_empleAsig: "12345678", // Placeholder
                },
              ]);
              // --- AGREGAR SERVICIO AUTOMÁTICAMENTE SI NO ESTÁ ---
              if (!serviciosSeleccionados.find(s => s.nro_servicio === actividad.nro_servicio)) {
                const servicio = servicios.find(s => s.nro_servicio === actividad.nro_servicio);
                if (servicio) {
                  setServiciosSeleccionados([...serviciosSeleccionados, servicio]);
                }
              }
              // ---------------------------------------------------
              setActividadSeleccionada("");
            } else {
              alert(
                "No se encontró relación producto-actividad para esta actividad."
              );
            }
          } else {
            alert("Error al buscar relaciones producto-actividad");
          }
        } catch (error) {
          alert("Error al buscar datos de producto para la actividad");
        }
      }
    }
  };

  // Función para eliminar servicio
  const eliminarServicio = (nroServicio: number) => {
    setServiciosSeleccionados(serviciosSeleccionados.filter(s => s.nro_servicio !== nroServicio));
  };

  // Función para eliminar actividad
  const eliminarActividad = (nroServicio: number, nroCorrelativo: number) => {
    setActividadesSeleccionadas(actividadesSeleccionadas.filter(a => 
      !(a.nro_servicio === nroServicio && a.nro_correlativo === nroCorrelativo)
    ));
  };

  // Función para validar formato de fecha
  const validarFecha = (dd: string, mm: string, aa: string): boolean => {
    const dia = parseInt(dd);
    const mes = parseInt(mm);
    let año = parseInt(aa);
    // Si el año es de dos dígitos, convertirlo a 2000+aa
    if (aa.length === 2) {
      año = 2000 + año;
    }
    if (isNaN(dia) || isNaN(mes) || isNaN(año)) return false;
    if (dia < 1 || dia > 31) return false;
    if (mes < 1 || mes > 12) return false;
    if (año < 2000 || año > 2100) return false;
    return true;
  };

  // Función para validar formato de hora
  const validarHora = (hh: string, mm: string): boolean => {
    const hora = parseInt(hh);
    const minuto = parseInt(mm);
    
    if (isNaN(hora) || isNaN(minuto)) return false;
    if (hora < 0 || hora > 23) return false;
    if (minuto < 0 || minuto > 59) return false;
    
    return true;
  };

  // Función para formatear fecha
  const formatearFecha = (dd: string, mm: string, aa: string): string => {
    let año = aa;
    if (aa.length === 2) {
      año = (2000 + parseInt(aa)).toString();
    }
    return `${año}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  };

  // Función para formatear hora
  const formatearHora = (hh: string, mm: string): string => {
    return `${hh.padStart(2, '0')}:${mm.padStart(2, '0')}`;
  };

  // Función para crear actividades para el backend
  const crearActividadesBackend = (): ServiceActivity[] => {
    return actividadesSeleccionadas.map((actividad: any) => ({
      nro_servicio: actividad.nro_servicio,
      nro_correlativo: actividad.nro_correlativo,
      id_producto: actividad.id_producto,
      precio_producto: actividad.precio_producto,
      precio_actividad: actividad.costo,
      cantidad_producto: actividad.cantidad_producto,
      ci_empleAsig: actividad.ci_empleAsig,
    }));
  };

  // Función para enviar la orden de servicio
  const enviarOrdenServicio = async () => {
    // Validaciones
    if (!establecimientoSeleccionado) {
      alert("Debe seleccionar un establecimiento");
      return;
    }

    if (actividadesSeleccionadas.length === 0) {
      alert("Debe seleccionar al menos una actividad");
      return;
    }

    if (!placaVehiculo.trim()) {
      alert("Debe ingresar la placa del vehículo");
      return;
    }

    if (!validarFecha(fechaEntradaDD, fechaEntradaMM, fechaEntradaAA)) {
      alert("Fecha de entrada inválida");
      return;
    }

    if (!validarHora(horaEntradaHH, horaEntradaMM)) {
      alert("Hora de entrada inválida");
      return;
    }

    if (!validarHora(horaEstimadaSalidaHH, horaEstimadaSalidaMM)) {
      alert("Hora estimada de salida inválida");
      return;
    }

    setEnviandoOrden(true);

    try {
      const ordenData = {
        codigo_vehiculo: parseInt(placaVehiculo) || 1, // Por ahora usamos 1 como valor por defecto
        fecha_entrada: formatearFecha(fechaEntradaDD, fechaEntradaMM, fechaEntradaAA),
        hora_entrada: formatearHora(horaEntradaHH, horaEntradaMM),
        hora_estimada_salida: formatearHora(horaEstimadaSalidaHH, horaEstimadaSalidaMM),
        persona_autoriza: personaAutorizada || null,
        actividades: crearActividadesBackend(),
        id_rif: establecimientoSeleccionado
      };

      const response = await fetch('http://localhost:1234/service-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ordenData)
      });

      if (response.ok) {
        const result = await response.json();
        alert("Orden de servicio creada exitosamente");
        
        // Limpiar formulario
        setEstablecimientoSeleccionado("");
        setServiciosSeleccionados([]);
        setActividadesSeleccionadas([]);
        setPlacaVehiculo("");
        setFechaEntradaDD("");
        setFechaEntradaMM("");
        setFechaEntradaAA("");
        setHoraEntradaHH("");
        setHoraEntradaMM("");
        setHoraEstimadaSalidaHH("");
        setHoraEstimadaSalidaMM("");
        setJustificacion("");
        setPersonaAutorizada("");
      } else {
        const errorData = await response.json();
        alert(`Error al crear la orden: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error al enviar la orden:', error);
      alert('Error al enviar la orden de servicio');
    } finally {
      setEnviandoOrden(false);
    }
  };

  return (
    <div className={styles.container}>
      <TopBar text="Registrar Orden de Servicio" menu={true} />
      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); enviarOrdenServicio(); }}>
        <div className={styles.row}>
          <label>Establecimiento:</label>
          <select 
            className={styles.input}
            value={establecimientoSeleccionado}
            onChange={(e) => setEstablecimientoSeleccionado(e.target.value)}
            disabled={cargandoEstablecimientos}
          >
            <option value="">Seleccione un establecimiento</option>
            {establecimientos.map((est) => (
              <option key={est.RIF} value={est.RIF}>
                {est.nombre} - {est.ciudad}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.row}>
          <label>Placa del Vehículo:</label>
          <input 
            className={styles.input} 
            type="text" 
            value={placaVehiculo}
            onChange={(e) => setPlacaVehiculo(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label>Agregar Servicios:</label>
          <select 
            className={styles.input}
            value={servicioSeleccionado}
            onChange={(e) => setServicioSeleccionado(e.target.value)}
            disabled={!establecimientoSeleccionado || cargandoServicios}
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map((serv) => (
              <option key={serv.nro_servicio} value={serv.nro_servicio}>
                {serv.nombre_ser}
              </option>
            ))}
          </select>
          <button 
            type="button" 
            onClick={agregarServicio}
            disabled={!servicioSeleccionado}
            className={styles.addButton}
          >
            +
          </button>
        </div>

        {/* Servicios seleccionados */}
        {serviciosSeleccionados.length > 0 && (
          <div className={styles.selectedItems}>
            <h4>Servicios Seleccionados:</h4>
            {serviciosSeleccionados.map((servicio) => (
              <div key={servicio.nro_servicio} className={styles.selectedItem}>
                <span>{servicio.nombre_ser}</span>
                <button 
                  type="button" 
                  onClick={() => eliminarServicio(servicio.nro_servicio)}
                  className={styles.removeButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className={styles.row}>
          <label>Agregar Actividades:</label>
          <select 
            className={styles.input}
            value={actividadSeleccionada}
            onChange={(e) => setActividadSeleccionada(e.target.value)}
            disabled={!servicioSeleccionado || cargandoActividades}
          >
            <option value="">Seleccione una actividad</option>
            {actividades
              .filter((act) =>
                relacionesActividadProducto.some(
                  (rel) =>
                    rel.nro_servicio === act.nro_servicio &&
                    rel.nro_correlativo === act.nro_correlativo
                )
              )
              .map((act) => (
                <option key={act.nro_correlativo} value={act.nro_correlativo}>
                  {act.nombre} - ${act.costo}
                </option>
              ))}
          </select>
          <button 
            type="button" 
            onClick={agregarActividad}
            disabled={!actividadSeleccionada}
            className={styles.addButton}
          >
            +
          </button>
        </div>

        {/* Actividades seleccionadas */}
        {actividadesSeleccionadas.length > 0 && (
          <div className={styles.selectedItems}>
            <h4>Actividades Seleccionadas:</h4>
            {actividadesSeleccionadas.map((actividad) => (
              <div key={`${actividad.nro_servicio}-${actividad.nro_correlativo}`} className={styles.selectedItem}>
                <span>{actividad.nombre} - ${actividad.costo}</span>
                <button 
                  type="button" 
                  onClick={() => eliminarActividad(actividad.nro_servicio, actividad.nro_correlativo)}
                  className={styles.removeButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className={styles.rowGroup}>
          <div className={styles.rowDateTime}>
            <label>Fecha Entrada:</label>
            <input 
              className={styles.inputDate} 
              type="text" 
              placeholder="DD" 
              maxLength={2} 
              value={fechaEntradaDD}
              onChange={(e) => setFechaEntradaDD(e.target.value)}
            />
            <input 
              className={styles.inputDate} 
              type="text" 
              placeholder="MM" 
              maxLength={2} 
              value={fechaEntradaMM}
              onChange={(e) => setFechaEntradaMM(e.target.value)}
            />
            <input 
              className={styles.inputDate} 
              type="text" 
              placeholder="AA" 
              maxLength={2} 
              value={fechaEntradaAA}
              onChange={(e) => setFechaEntradaAA(e.target.value)}
            />
          </div>
          <div className={styles.rowDateTime}>
            <label>Hora Entrada:</label>
            <input 
              className={styles.inputDate} 
              type="text" 
              placeholder="HH" 
              maxLength={2} 
              value={horaEntradaHH}
              onChange={(e) => setHoraEntradaHH(e.target.value)}
            />
            <input 
              className={styles.inputDate} 
              type="text" 
              placeholder="MM" 
              maxLength={2} 
              value={horaEntradaMM}
              onChange={(e) => setHoraEntradaMM(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.rowDateTime}>
            <label>Fecha Salida:</label>
            <input 
              className={styles.inputDate} 
              type="text" 
              placeholder="DD" 
              maxLength={2} 
              value={fechaSalidaDD}
              onChange={(e) => setFechaSalidaDD(e.target.value)}
            />
            <input 
              className={styles.inputDate} 
              type="text" 
              placeholder="MM" 
              maxLength={2} 
              value={fechaSalidaMM}
              onChange={(e) => setFechaSalidaMM(e.target.value)}
            />
            <input 
              className={styles.inputDate} 
              type="text" 
              placeholder="AA" 
              maxLength={2} 
              value={fechaSalidaAA}
              onChange={(e) => setFechaSalidaAA(e.target.value)}
            />
          </div>
          <div className={styles.rowDateTime}>
            <label>Hora Estimada Salida:</label>
            <input 
              className={styles.inputDate} 
              type="text" 
              placeholder="HH" 
              maxLength={2} 
              value={horaEstimadaSalidaHH}
              onChange={(e) => setHoraEstimadaSalidaHH(e.target.value)}
            />
            <input 
              className={styles.inputDate} 
              type="text" 
              placeholder="MM" 
              maxLength={2} 
              value={horaEstimadaSalidaMM}
              onChange={(e) => setHoraEstimadaSalidaMM(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label>Justificación:</label>
          <TextBoxMU 
            etiqueta="" 
            viewWidth={30} 
            viewHeight={8} 
            ejemplo="Justificación" 
          />
        </div>

        <div className={styles.row}>
          <label>Persona Autorizada:</label>
          <input 
            className={styles.input} 
            type="text" 
            value={personaAutorizada}
            onChange={(e) => setPersonaAutorizada(e.target.value)}
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button 
            texto={enviandoOrden ? "Enviando..." : "Añadir"} 
            inactivo={enviandoOrden}
          />
        </div>
      </form>
    </div>
  );
};

export default RegistrarOrdenServicio; 