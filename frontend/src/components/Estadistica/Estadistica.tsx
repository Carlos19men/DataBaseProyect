import  styles  from "./Estadistica.module.css";

interface EstadisticaProps {
    nombre:string;
    ancho:number;
}  

const Estadistica:React.FC<EstadisticaProps> =({nombre,ancho}) => {

    return(<span>
            <div className={styles.estadistica} style={{width:`${ancho}%`}}>{nombre}</div>
    </span>
    )
}

export default Estadistica;