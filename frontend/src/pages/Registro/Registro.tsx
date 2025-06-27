import styles from "./Registro.module.css";
import TopBar from "../../components/TopBar/TopBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/button";
import RegistroCliente from "./TipoRegistro/RegistroCliente";
import RegistroEmpleado from "./TipoRegistro/RegistroEmpleado";

const Registro: React.FC  = () => {
    const [tipo, setTipo] = useState<"empleado" | "cliente" >("empleado");
    const navigator = useNavigate();
    return (
        <div className={styles.container}>
            <TopBar text="Registro" menu={false}></TopBar>
            <span className={styles.botones}>
                <Button viewHeight={5} texto="Empleado" onClick={() => setTipo("empleado")} inactivo={tipo === "cliente"} />
                <Button viewHeight={5} texto="Cliente" onClick={() => setTipo("cliente")} inactivo={tipo === "empleado"} />
            </span>
            <div className={styles.centrado}>
                {tipo === "empleado" && <div><RegistroEmpleado></RegistroEmpleado></div>}
                {tipo === "cliente" && <div><RegistroCliente></RegistroCliente></div>}
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
    )
}

export default Registro;