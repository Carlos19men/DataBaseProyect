import React, { useEffect, useState } from "react";
import MenuDespegable from "../../components/Menu Desplegable/MenuDesplegable";
import styles from "./Busqueda.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Button from "../../components/Button/button";


const Busqueda : React.FC = ({}) => {
    const [busqueda, setBusqueda] = React.useState<string>("");
    const [resultados, setResultados] = React.useState<any[]|any>([]);
    const [url, setUrl] = React.useState<string>("employee");

async function buscar(ID:string="") {


    const res = await fetch("http://localhost:1234/" + url + "/" + ID,
        {method:"GET",headers:{"Content-Type":"application/json"}})
      .then(res => res.json())
      .then(lista => (lista))
      .catch(err => ("Solicitud falló con: " + err));

        console.log(url, ID, res);

     if (typeof res === "string") {
        setResultados(res)
    }
    setResultados (res)
}

    useEffect(() => {
        buscar();
    }, [url]);

    return (
        <div >

            <div className={styles.bar} >
                <MenuDespegable ></MenuDespegable> 
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                    <SearchBar etiqueta="" ejemplo="Buscar" viewWidth={70} viewHeight={8} value={busqueda} onSearchClick={() => { buscar(busqueda) }} onChange={(e) => {setBusqueda(e.target.value)}}></SearchBar>
                </div>
            </div>

            <div className={styles.columnas}>
                    <div className={styles.resultados}>
                    {typeof resultados === "string" ? (
                        <div>{resultados}</div>
                    ) : !Array.isArray(resultados) ? (
                        JSON.stringify(resultados, null, 2)
                        ) : (
                        resultados.map((item: any, idx: number) => (
                        <div className={styles.item} key={idx}>
                            {typeof item === "object" && item !== null ? (
                            <div>
                                {Object.entries(item).map(([key, value]) => (
                                <div key={key}>
                                    <strong>{key}:</strong> {String(value)}
                                </div>
                                ))}
                            </div>
                            ) : (<pre>{String(item)}</pre>)}
                        </div>
                        ))
                    )}
                    </div> 
                    
                    <div className={styles.filtros}>
                    <div className={styles.subtitle}>Filtros</div>
                    <Button texto="Empleados" viewHeight={5} onClick={() => {setUrl("employee");}}></Button>
                    <Button texto="Establecimientos" viewHeight={5} onClick={() => { setUrl("establishement"); }}></Button>
                    <Button texto="Clientes" viewHeight={5} onClick={() => { setUrl("customer");  }}></Button>
                    <Button texto="Proveedores" viewHeight={5} onClick={() => { setUrl("suppliers"); }}></Button>
                </div>
                </div>

            </div>

    )
}

export default Busqueda;
