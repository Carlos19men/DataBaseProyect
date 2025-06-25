import TextBoxMU from "../../../components/TextBoxMU/TextBoxMU";
import styles from "../Login.module.css";


const LoginCli: React.FC = () => {
    
    return (
        <div className={styles.container}>
            <h2 className="subtitle">Ingrese su cedula: </h2>
            <TextBoxMU etiqueta="" viewWidth={60}></TextBoxMU>

        </div>
    );
};

export default LoginCli;