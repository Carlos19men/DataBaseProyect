import styles from "../Login.module.css";
import TopBar from "../../../components/TopBar/TopBar";
import TextBoxMU from "../../../components/TextBoxMU/TextBoxMU";

const LoginEmp: React.FC = () => {

    return (
        <div className={styles.container}>
            <h2 className="subtitle">Ingrese su cedula: </h2>
            <TextBoxMU etiqueta="" viewWidth={60}></TextBoxMU>
            
        </div>
    );
};

export default LoginEmp;