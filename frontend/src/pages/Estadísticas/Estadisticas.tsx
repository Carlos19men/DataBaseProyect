import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/button";
import Estadistica from "../../components/Estadistica/Estadistica";
import styles from "./Estadisticas.module.css";

const Estadisticas: React.FC = () => {
	//variable segun los resultados de fetch
	const [resultados, setResultados] = useState<any[]>([]);
	//variable segun las url que se necesiten consultar
	const [url, setUrl] = useState<string>("establishement");
	//variable segun el numero de elementos del arreglo (si es que lo es)
	const [conteo, setConteo] = useState<number>(0);
	//variable según el conteo de nuestro fetch
	const [trabajadoresPorEst, setTrabajadoresPorEst] = useState<{
		[id: string]: number;
	}>({});
	// variable según el conteo de servicios por establecimiento
	const [serviciosPorEst, setServiciosPorEst] = useState<{
		[id: string]: number;
	}>({});
	// variable según el tipo de estadística que se quiera mostrar
	const [tipoEstadistica, setTipoEstadistica] = useState<
		"empleados" | "servicios" | "marcas"
	>("empleados");
	// variable según el conteo de marcas por servicio
	const [marcasPorServicio, setMarcasPorServicio] = useState<{
		[id: string]: number;
	}>({});

	// Buscar establecimientos
	async function buscar(ID: string = "") {
		//se guarda en una constante los resultados de nuestro fetch para comprobar
		//luego si es un arreglo y poner su longitud como conteo y datos en resultados
		const res = await fetch("http://localhost:1234/" + url + "/" + ID, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.catch((err) => "Solicitud falló con: " + err);

		setResultados(Array.isArray(res) ? res : []);
		setConteo(Array.isArray(res) ? res.length : 0);
	}

	// Buscar número de empleados por establecimiento
	useEffect(() => {
		if (!Array.isArray(resultados)) return;
		const fetchDatos = async () => {
			const nuevosValores: { [id: string]: number } = {};

			await Promise.all(
				resultados.map(async (item) => {
					const idEst = item.id || item.RIF;
					if (!idEst) return;

					if (tipoEstadistica === "empleados") {
						const empleados = await fetch(
							`http://localhost:1234/employee/RIF/${idEst}`
						)
							.then((res) => res.json())
							.catch(() => []);
						nuevosValores[idEst] = Array.isArray(empleados)
							? empleados.length
							: 0;
					} else if (tipoEstadistica === "servicios") {
						const servicios = await fetch(
							`http://localhost:1234/offered-services/rif/${idEst}`
						)
							.then((res) => res.json())
							.catch(() => []);
						nuevosValores[idEst] = Array.isArray(servicios)
							? servicios.length
							: 0;
					} else if (tipoEstadistica === "marcas") {
						// Suponiendo que item es un tipo de servicio y tiene un id o nombre
						// Cambia la URL según tu backend
						const marcas = await fetch(
							`http://localhost:1234/brand/${item.id || item.nombre}`
						)
							.then((res) => res.json())
							.catch(() => []);
						// Contamos cuántas marcas distintas hay
						marcasPorServicio[item.id || item.nombre] = Array.isArray(marcas)
							? marcas.length
							: 0;
					}
				})
			);

			if (tipoEstadistica === "empleados") {
				setTrabajadoresPorEst(nuevosValores);
			} else if (tipoEstadistica === "servicios") {
				setServiciosPorEst(nuevosValores);
			} else if (tipoEstadistica === "marcas") {
				setMarcasPorServicio(marcasPorServicio);
			}
		};

		fetchDatos();
	}, [resultados, tipoEstadistica]);

	useEffect(() => {
		buscar();
	}, [url]);
	// Justo antes del return, calcula el máximo según el tipo de estadística:
	let maxValor = 1;
	if (tipoEstadistica === "empleados") {
		maxValor = Math.max(...Object.values(trabajadoresPorEst), 1);
	} else if (tipoEstadistica === "servicios") {
		maxValor = Math.max(...Object.values(serviciosPorEst), 1);
	} else if (tipoEstadistica === "marcas") {
		maxValor = Math.max(...Object.values(marcasPorServicio), 1);
	}

	let header = "";
	if (tipoEstadistica === "empleados") {
		header = "Empleados por establecimiento";
	} else if (tipoEstadistica === "servicios") {
		header = "Servicios por establecimiento";
	} else if (tipoEstadistica === "marcas") {
		header = "Marcas atendidas por tipo de servicio";
	}

	return (
		<div>
			<TopBar text="Estadísticas" menu={true}></TopBar>
			<div className={styles.columnas}>
				<div className={styles.estadisticas} style={{ gap: 0 }}>
					{Array.isArray(resultados) && resultados.length > 0 ? (
						resultados.map((item: any, idx: number) => {
							const idEst = item.id || item.RIF || item.nombre;
							let valor = 0;
							let label = "";

							if (tipoEstadistica === "empleados") {
								valor = trabajadoresPorEst[idEst] ?? 0;
								label = `${valor} trabajadores`;
							} else if (tipoEstadistica === "servicios") {
								valor = serviciosPorEst[idEst] ?? 0;
								label = `${valor} servicios`;
							} else if (tipoEstadistica === "marcas") {
								valor = marcasPorServicio[idEst] ?? 0;
								label = `${valor} marcas atendidas`;
							}

							const widthPercent = (valor / maxValor) * 100;

							return (
								<div
									className={styles.stat}
									key={idx}
									style={{
										minWidth: "40px",
										transition: "width 0.5s",
									}}
								>
									{valor !== 0 && (
                                    <Estadistica
                                        nombre={item.nombre || `Servicio ${idx + 1}`}
                                        ancho={widthPercent}
                                    />
                                )}
									<div
										style={{ fontSize: "75%", color: "#888", width: "100%" }}
									>
										{valor === 0
											? `El valor de ${item.nombre || `el elemento ${idx + 1}`} es cero`
											: `ID: ${idEst} | ${label}`
										}
									</div>
								</div>
							);
						})
					) : (
						<div>No hay datos para mostrar.</div>
					)}
				</div>
				<div className={styles.filtros}>
					<div className={styles.subtitle}>Filtros</div>
					<Button
						fuente={3}
						texto="Empleados por establecimiento"
						onClick={() => setTipoEstadistica("empleados")}
					/>
					<Button
						fuente={3}
						texto="Servicios por establecimiento"
						onClick={() => setTipoEstadistica("servicios")}
					/>
					<Button
						fuente={3}
						texto="Marcas por tipo de servicio"
						onClick={() => setTipoEstadistica("marcas")}
					/>
				</div>
			</div>
			<div style={{ marginTop: "1em", textAlign: "center", color: "#444" }}>
				Total de establecimientos: {conteo}
			</div>
		</div>
	);
};

export default Estadisticas;
