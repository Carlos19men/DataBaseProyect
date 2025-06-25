import styles from "../Login.module.css";
import TopBar from "../../../components/TopBar/TopBar";
import TextBoxMU from "../../../components/TextBoxMU/TextBoxMU";

const LoginEmp: React.FC = () => {

    return (
        <div className={styles.container}>
            <TextBoxMU etiqueta="IdEmpleado" viewWidth={60}></TextBoxMU>
            
        </div>
    );
};

export default LoginEmp;