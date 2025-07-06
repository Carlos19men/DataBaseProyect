import React, { useEffect, useState } from "react";
import Button from "../../components/Button/button";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
import { usegetAllAPI } from "../PseudoAPI/PseudoAPI";
/*import { customerModel } from "../../../../backend/models/Clientes";
import { employeeModel } from "../../../../backend/models/Empleados";*/

const Login: React.FC = () => {
  
    const navigator = useNavigate();
    const [cedulaEmpleado, setCedulaE] = useState<any>('');
    const [textoErr,setTextoErr] = useState<string>("");


    // Llama al hook aquí, pasando la cédula correspondiente
    
    const handleLogin = async () => {
        try {
            const res = await fetch(`http://localhost:1234/employee/${cedulaEmpleado}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
            const empleadoData = await res.json();
            if (
                empleadoData &&
                empleadoData !== "Cargando" &&
                empleadoData !== null &&
                empleadoData.message === undefined &&
                Array.isArray(empleadoData) === false
            ) {
                localStorage.setItem("isLoggedIn", "true"); // <--- Guarda login
                navigator("/HomePage");
            } else {

                setTextoErr("Empleado no encontrado");
            }
        } catch (err) {
            
            setTextoErr("Error de conexión");
        }
    };

    return (
        <div className={styles.container}>
            <TopBar menu={false} text="Inicio de sesión" />
            <div className={styles.centrado}>
                    <div>
                        <div className={styles.error}>{textoErr}</div>
                        <div className={styles.oculto}></div>
                        
                        <TextBoxMU etiqueta="Ingrese su Cédula: " ejemplo="12345724" viewWidth={60} value={cedulaEmpleado} onChange={e => setCedulaE(e.target.value)} ></TextBoxMU>
                    </div>   
            </div>
            
            <div className={styles.centrado}>
                <Button texto="Ingresar" onClick={handleLogin}></Button>
            </div>

        </div>
    );
};

export default Login;