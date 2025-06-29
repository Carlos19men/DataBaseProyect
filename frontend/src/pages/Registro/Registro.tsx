import styles from "./Registro.module.css";
import TopBar from "../../components/TopBar/TopBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/button";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";

const Registro: React.FC  = () => {
    const [tipo, setTipo] = useState<"empleado" | "cliente" >("empleado");
    const navigator = useNavigate();

    //form values
    //empleados
    const [nombreEmpleado,setNombreEmpleado] = useState("");
    const [apellidoEmpleado,setApellidoEmpleado] = useState("");
    const [cedulaEmpleado,setCedulaEmpleado] = useState("");
    const [correoEmpleado,setCorreoEmpleado] = useState("");
    const [sueldoEmpleado,setSueldoEmpleado] = useState("");
    const [telefonoEmpleado,setTelefonoEmpleado] = useState("");
    const [direccionEmpleado,setDireccionEmpleado] = useState("");
    const [rifEmpleado,setRifEmpleado] = useState("");
    //clientes
    const [nombreCliente,setNombreCliente] = useState("");
    const [apellidoCliente,setApellidoCliente] = useState("");
    const [cedulaCliente,setCedulaCliente] = useState("");
    const [correoCliente,setCorreoCliente] = useState("");

    return (
        <div className={styles.container}>
            <TopBar text="Registro" menu={false}></TopBar>
            <span className={styles.botones}>
                <Button viewHeight={5} texto="Empleado" onClick={() => setTipo("empleado")} inactivo={tipo === "cliente"} />
                <Button viewHeight={5} texto="Cliente" onClick={() => setTipo("cliente")} inactivo={tipo === "empleado"} />
            </span>
            <div className={styles.centrado}>
                {tipo === "empleado" && 
                    <div>
                        <div className={styles.form}>
                            <TextBoxMU etiqueta="Nombres: " viewWidth={27} viewHeight={5} value={nombreEmpleado} onChange={(e:any) => setNombreEmpleado(e.target.value)}></TextBoxMU>
                            <TextBoxMU etiqueta="Apellidos: " viewWidth={27} viewHeight={5} value={apellidoEmpleado} onChange={(e:any) => setApellidoEmpleado(e.target.value)}></TextBoxMU>
                        </div>
                        <div className={styles.form}>
                            <TextBoxMU etiqueta="Cedula de Identidad: " viewWidth={8.5}viewHeight={5}></TextBoxMU>
                            <TextBoxMU etiqueta="" viewWidth={45}viewHeight={5} value={cedulaEmpleado} onChange={(e:any) => setCedulaEmpleado(e.target.value)}></TextBoxMU>
                        </div>
                        <div className={styles.form}>
                            <TextBoxMU etiqueta="Correo Electronico: " viewWidth={60}viewHeight={5} value={correoEmpleado} onChange={(e:any) => setCorreoEmpleado(e.target.value)}></TextBoxMU>
                        </div>
                        <div className={styles.form}>
                            <TextBoxMU etiqueta="Sueldo: " viewWidth={20}viewHeight={5} value={sueldoEmpleado} onChange={(e:any) => setSueldoEmpleado(e.target.value)}></TextBoxMU>
                            <TextBoxMU etiqueta="Numero de telefono: " viewWidth={26}viewHeight={5} value={telefonoEmpleado} onChange={(e:any) => setTelefonoEmpleado(e.target.value)}></TextBoxMU>
                        </div>
                        <div className={styles.form}>
                            <TextBoxMU etiqueta="Direccion: " viewWidth={68}viewHeight={5} value={direccionEmpleado} onChange={(e:any) => setDireccionEmpleado(e.target.value)}></TextBoxMU>
                        </div>
                        <div className={styles.form}>
                            <TextBoxMU etiqueta="RIF del Establecimiento: " viewWidth={55}viewHeight={5} value={rifEmpleado} onChange={(e:any) => setRifEmpleado(e.target.value)}></TextBoxMU>
                        </div>
                    </div>
                }
                {tipo === "cliente" && 
                    <div>
                        <div className={styles.form}>
                            <TextBoxMU etiqueta="Nombres: " viewWidth={27} viewHeight={5} value={nombreCliente} onChange={(e:any) => setNombreCliente(e.target.value)}></TextBoxMU>
                            <TextBoxMU etiqueta="Apellidos: " viewWidth={27} viewHeight={5} value={apellidoCliente} onChange={(e:any) => setApellidoCliente(e.target.value)}></TextBoxMU>
                        </div>
                        <div className={styles.form}>
                            <TextBoxMU etiqueta="Cedula de Identidad: " viewWidth={8.5}></TextBoxMU>
                            <TextBoxMU etiqueta="" viewWidth={45} value={cedulaCliente} onChange={(e:any) => setCedulaCliente(e.target.value)}></TextBoxMU>
                        </div>
                        <div className={styles.form}>
                            <TextBoxMU etiqueta="Correo Electronico: " viewWidth={60} value={correoCliente} onChange={(e:any) => setCorreoCliente(e.target.value)}></TextBoxMU>
                        </div>
                    </div>
                }
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