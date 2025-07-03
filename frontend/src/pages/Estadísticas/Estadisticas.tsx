
import { useEffect } from "react";
import TopBar from "../../components/TopBar/TopBar"
import React from "react";
import styles from "./Estadisticas.module.css"
import Button from "../../components/Button/button";
import Estadistica from "../../components/Estadistica/Estadistica";


const Estadisticas : React.FC = () => {const [busqueda, setBusqueda] = React.useState<string>("");
    const [resultados, setResultados] = React.useState<any[]|any>([]);
    const [url, setUrl] = React.useState<string>("employee");
    const [medicion,setMedicion]=React.useState<number>(0);
const [conteo, setConteo] = React.useState<number>(0);


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
    // Contar elementos
    if (Array.isArray(res)) {
        setConteo(res.length);
    } else if (typeof res === "object" && res !== null) {
        setConteo(Object.keys(res).length);
    } else {
        setConteo(0);
    }
}

    useEffect(() => {
        buscar();
    }, [url]);
    
    return (
        <div>  
            <TopBar text="Estadísticas" menu={true}></TopBar>

            <div className={styles.columnas}>
                <div className={styles.estadisticas}>
                    <div className={styles.stat} >
                        <Estadistica puntos={medicion} nombre="Elem 1"></Estadistica>
                    </div>
                    <div className={styles.stat} >
                        <Estadistica puntos={medicion/2} nombre="Elem 2"></Estadistica>
                    </div>
                    <div className={styles.stat} >
                        <Estadistica puntos={medicion*2} nombre="Elem 3"></Estadistica>
                    </div>
                    <div className={styles.stat} >
                        <Estadistica puntos={medicion/2} nombre="Elem 4"></Estadistica>
                    </div>
                    <div className={styles.stat} >
                        <Estadistica puntos={medicion*2} nombre="Elem 5"></Estadistica>
                    </div>
                     <div className={styles.stat} >
                        <Estadistica puntos={medicion/2} nombre="Elem 6"></Estadistica>
                    </div>
                    <div className={styles.stat} >
                        <Estadistica puntos={medicion*2} nombre="Elem 7"></Estadistica>
                    </div> <div className={styles.stat} >
                        <Estadistica puntos={medicion/2} nombre="Elem 8"></Estadistica>
                    </div>
                    <div className={styles.stat} >
                        <Estadistica puntos={medicion*2} nombre="Elem 9"></Estadistica>
                    </div>

                </div> 
                        
                <div className={styles.filtros}>
                    <div className={styles.subtitle}>Filtros</div>
                        
                    </div>
                    
                
            </div>

            <div className={styles.escalas}>
               <span style={{padding:`0 ${3 + (medicion/75*15)}vw `}}>{medicion/2}</span>
               <span style={{padding:`0 ${ medicion/10}% `}}>{medicion}</span>
               <span style={{padding:`0 ${ medicion/75*15*2}% `}}>{medicion*2}</span>
            </div>

            <div style={{padding:"0 10vw "}}> 
                <Button texto="Bajar" viewHeight={7} onClick={() => {setMedicion(medicion-10);}}></Button>
                <span style={{padding:"0 2vw"}}></span>
                <Button texto="Subir" viewHeight={7} onClick={() => {setMedicion(medicion+10);}}></Button>
                    
            </div>

            <div>prueba conteo : {conteo}</div>

        </div>

    )
}

export default Estadisticas