
import TextBoxMU from "../../../components/TextBoxMU/TextBoxMU";
import styles from "../Login.module.css";


const LoginCli: React.FC = () => {
    
    return (
        <div className={styles.container}>
            <TextBoxMU etiqueta="idCliente" viewWidth={60}></TextBoxMU>

        </div>
    );
};

export default LoginCli;