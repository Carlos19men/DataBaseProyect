import TextBoxMU from "../../../components/TextBoxMU/TextBoxMU";
import styles from "../Registro.module.css";

const RegistroCliente: React.FC = () => {
    return(
        <div className={styles.container}>
            <div className={styles.form}>
                <TextBoxMU etiqueta="Nombre completo: " viewWidth={60}></TextBoxMU>
            </div>
            <div className={styles.form}>
                <TextBoxMU etiqueta="Cedula de Identidad: " viewWidth={8.5}></TextBoxMU>
                <TextBoxMU etiqueta="" viewWidth={45}></TextBoxMU>
            </div>
            <div className={styles.form}>
                <TextBoxMU etiqueta="Correo Electronico: " viewWidth={60}></TextBoxMU>
            </div>
        </div>
    )
}

export default RegistroCliente;