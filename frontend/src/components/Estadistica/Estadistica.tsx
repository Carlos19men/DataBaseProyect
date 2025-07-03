import  styles  from "./Estadistica.module.css";

interface EstadisticaProps {
    puntos: number;
    nombre:string;
}

const Estadistica:React.FC<EstadisticaProps> =({puntos,nombre}) => {

    return(<span>
            <div className={styles.estadistica} style={{width:`${puntos}vh`}}>{nombre}</div>
    </span>
    )
}

export default Estadistica;