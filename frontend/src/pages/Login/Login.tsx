import { useState } from "react";
import Button from "../../components/Button/button";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./Login.module.css";
import LoginEmp from "./Tipologin/Empleado";
import LoginCli from "./Tipologin/Cliente";
import { Navigate, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [tipo, setTipo] = useState<"empleado" | "cliente" >("empleado");
    const navigator = useNavigate();
    return (
        <div className={styles.container}>
            <TopBar text="Inicio de sesión" />

            <span className={styles.botones}>
                <Button texto="empleado" onClick={() => setTipo("empleado")} inactivo={tipo === "cliente"} />
                <Button texto="cliente" onClick={() => setTipo("cliente")} inactivo={tipo === "empleado"} />
            </span>
      
                <div className={styles.centrado}>
                    {tipo === "empleado" && <div><LoginEmp ></LoginEmp></div>}
                    {tipo === "cliente" && <div><LoginCli></LoginCli> </div>}
                </div>
            <div className={styles.centrado} ><Button texto="Ingresar" onClick={()=> {
                
                if (tipo === "cliente"){
                    
                    //AQUÍ EL LLAMADO A LA BASE DE DATOS 
                    
                }else{

                    //AQUÍ EL LLAMADO A LA BASE DE DATOS 

                }
                
                navigator("/HomePage");
            }
            }></Button></div>
        </div>
    );
};

export default Login;
