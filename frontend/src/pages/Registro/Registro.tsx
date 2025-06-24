import { useNavigate } from "react-router-dom"
import styles from "./Registro.module.css"
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";

const Registro: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.container}>

          
        
            <span><TextBoxMU  etiqueta="Prueba" viewWidth={20}></TextBoxMU><TextBoxMU  etiqueta="HOLA PROBANDO" viewWidth={20}></TextBoxMU></span>
        
        
        </div>
    )
    }
    export default Registro;