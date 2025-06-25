import styles from "./Registro.module.css";
import TopBar from "../../components/TopBar/TopBar";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";

const Registro: React.FC  = () => {
    return (
        <div>
            <TopBar text="Registro"></TopBar>
            <span><TextBoxMU  etiqueta="Prueba" viewWidth={30}></TextBoxMU><TextBoxMU  etiqueta="HOLA PROBANDO" viewWidth={20}></TextBoxMU></span>
        </div>
    )
}

export default Registro;