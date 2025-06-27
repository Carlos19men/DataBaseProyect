import TextBoxMU from "../../../components/TextBoxMU/TextBoxMU";
import styles from "../Registro.module.css";

const RegistroEmpleado: React.FC = () => {
    return(
        <div className={styles.container}>
            <div className={styles.form}>
                <TextBoxMU etiqueta="Nombres: " viewWidth={27} viewHeight={5}></TextBoxMU>
                <TextBoxMU etiqueta="Apellidos: " viewWidth={27} viewHeight={5}></TextBoxMU>
            </div>
            <div className={styles.form}>
                <TextBoxMU etiqueta="Cedula de Identidad: " viewWidth={8.5}viewHeight={5}></TextBoxMU>
                <TextBoxMU etiqueta="" viewWidth={45}viewHeight={5}></TextBoxMU>
            </div>
            <div className={styles.form}>
                <TextBoxMU etiqueta="Correo Electronico: " viewWidth={60}viewHeight={5}></TextBoxMU>
            </div>
            <div className={styles.form}>
                <TextBoxMU etiqueta="Sueldo: " viewWidth={20}viewHeight={5}></TextBoxMU>
                <TextBoxMU etiqueta="Numero de telefono: " viewWidth={26}viewHeight={5}></TextBoxMU>
            </div>
            <div className={styles.form}>
                <TextBoxMU etiqueta="Direccion: " viewWidth={68}viewHeight={5}></TextBoxMU>
            </div>
            <div className={styles.form}>
                <TextBoxMU etiqueta="RIF del Establecimiento: " viewWidth={55}viewHeight={5}></TextBoxMU>
            </div>
        </div>
    )
}

export default RegistroEmpleado;