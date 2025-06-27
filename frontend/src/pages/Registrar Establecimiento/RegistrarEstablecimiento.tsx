import Button from "../../components/Button/button";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./RegistrarEstablecimiento.module.css";

const RegistrarEstablecimiento: React.FC = () => {
    return(
        <div>
            <TopBar text="Registrar Establecimiento" menu={false}></TopBar>

            <div className={styles.centrado} >
                <div className={styles.container}>
                    <div className={styles.form}>
                        <TextBoxMU etiqueta="RIF del Establecimiento: " viewWidth={55}></TextBoxMU>
                    </div>
                    <div className={styles.form}>
                        <TextBoxMU etiqueta="Nombre: " viewWidth={70}></TextBoxMU>
                    </div>
                    <div className={styles.form}>
                        <TextBoxMU etiqueta="Ciudad: " viewWidth={71}></TextBoxMU>
                    </div>
                    <div className={styles.form}>
                        <TextBoxMU etiqueta="Cedula del encargado: " viewWidth={8.5}></TextBoxMU>
                        <TextBoxMU etiqueta="" viewWidth={43}></TextBoxMU>
                    </div>
                    <div className={styles.form}>
                        <TextBoxMU etiqueta="Fecha desde la que es encargado: " viewWidth={8.5}></TextBoxMU>
                        <TextBoxMU etiqueta="" viewWidth={8.5}></TextBoxMU>
                        <TextBoxMU etiqueta="" viewWidth={8.5}></TextBoxMU>
                    </div>
                </div>
            </div>
            <div className={styles.centrado}>
                <Button texto="Ingresar" onClick={()=> {
                    //llamado a la base de datos
                }}></Button>
            </div>
        </div>
    )
}

export default RegistrarEstablecimiento;