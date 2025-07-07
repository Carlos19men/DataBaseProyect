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
	
	// variable según el conteo de servicios por establecimiento
	const [serviciosPorEst, setServiciosPorEst] = useState<{
		[id: string]: number;
	}>({});


	//proveededor que nos suministra mas produtos
	const [prodproveedores, setProdProveedores] = useState<{
		[id: string]: number;
	}>({});

	// variable según el tipo de estadística que se quiera mostrar
	const [tipoEstadistica, setTipoEstadistica] = useState<
		"servicios" | "prductosProv"
	>("servicios");


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

					if (tipoEstadistica === "servicios") {
						const servicios = await fetch(
							`http://localhost:1234/offered-services/rif/${idEst}`
						)
							.then((res) => res.json())
							.catch(() => []);
						nuevosValores[idEst] = Array.isArray(servicios)
							? servicios.length
							: 0;
					} else if (tipoEstadistica === "prductosProv") {
						const servicios = await fetch(
							`http://localhost:1234/product/provider/${idEst}`
						)
							.then((res) => res.json())
							.catch(() => []);
						nuevosValores[idEst] = Array.isArray(servicios)
							? servicios.length
							: 0;
					} 
				})
			);

			if (tipoEstadistica === "servicios") {
				setServiciosPorEst(nuevosValores);
			} 
		};

		fetchDatos();
	}, [resultados, tipoEstadistica]);

	useEffect(() => {
		buscar();
	}, [url]);
	// Justo antes del return, calcula el máximo según el tipo de estadística:
	let maxValor = 1;
	 if (tipoEstadistica === "servicios") {
		maxValor = Math.max(...Object.values(serviciosPorEst), 1);
	} 

	let header = "";
	if (tipoEstadistica === "servicios") {
		header = "Servicios por establecimiento";
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

							if (tipoEstadistica === "servicios") {
								valor = serviciosPorEst[idEst] ?? 0;
								label = `${valor} servicios`;

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
						texto="Servicios por establecimiento"
						onClick={() => setTipoEstadistica("servicios")}
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
