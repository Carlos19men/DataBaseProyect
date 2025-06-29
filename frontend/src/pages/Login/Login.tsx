import { useState } from "react";
import Button from "../../components/Button/button";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
import { customerModel } from "../../../../backend/models/Clientes";
import { employeeModel } from "../../../../backend/models/Empleados";

const Login: React.FC = () => {
    const [tipo, setTipo] = useState<"empleado" | "cliente" >("empleado");
    const navigator = useNavigate();
    const[cedulaCliente,setCedulaC] = useState('');
    const[cedulaEmpleado,setCedulaE] = useState('');

    const handelChangeE = (e:any) => {
        setCedulaE(e.target.value);
    }

    const handelChangeC = (e:any) => {
        setCedulaC(e.target.value);
    }

    return (
        <div className={styles.container}>
            <TopBar menu={false} text="Inicio de sesión" />

            <span className={styles.botones}>
                <Button texto="empleado" onClick={() => setTipo("empleado")} inactivo={tipo === "cliente"} />
                <Button texto="cliente" onClick={() => setTipo("cliente")} inactivo={tipo === "empleado"} />
            </span>
            <div className={styles.centrado}>
                {tipo === "empleado" && 
                    <div>
                        <TextBoxMU etiqueta="Ingrese su cedula: " viewWidth={60} value={cedulaCliente} onChange={handelChangeC}></TextBoxMU>
                    </div>
                }
                {tipo === "cliente" && 
                    <div>
                        <TextBoxMU etiqueta="Ingrese su cedula: " viewWidth={60} value={cedulaEmpleado} onChange={handelChangeE}></TextBoxMU>
                    </div>
                }
            </div>
            <div className={styles.centrado} ><Button texto="Ingresar" onClick={async ()=> {
                
                if (tipo === "cliente"){
                    let ced = await customerModel.getByCI(cedulaCliente);
                    
                    if (ced !== null) {
                        navigator("/HomePage");
                    } else {
                        navigator("/Registro");
                    }

                }else{
                    let ced = await employeeModel.getByCI(cedulaEmpleado)
                    
                    if (ced !== null) {
                        navigator("/HomePage");
                    } else {
                        navigator("/Registro");
                    }
                }
            }
            }></Button></div>
        </div>
    );
};

export default Login;
