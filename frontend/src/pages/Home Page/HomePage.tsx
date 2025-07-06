import { useState } from "react";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./HomePage.module.css";


const HomePage: React.FC = () => {

    return(
        <div>
            <TopBar text="Inicio" menu={true}></TopBar>
            <a href="/HomePage">
                <h1 className="subtitle" style={{margin:"5vh"}}>Servicios más solicitados de nuestros clientes</h1>
                <div className={styles.tarjetaCont}>
                <div className={styles.serviceBox}>
                    <h2>Servicio 1</h2>
                    <p>Descripción del servicio 1.</p>
                </div>
                <div className={styles.serviceBox}>
                    <h2>Servicio 2</h2>
                    <p>Descripción del servicio 2.</p>
                </div>
                <div className={styles.serviceBox}>
                    <h2>Servicio 3</h2>
                    <p>Descripción del servicio 3.</p>
                </div>
                </div>
            </a>
            <a href="/HomePage">
                <h1 className="subtitle"style={{margin:"5vh"}}>Empleados más activos</h1>
                <div className={styles.tarjetaCont}>
                <div className={styles.serviceBox}>
                    <h2>Empleado 1</h2>
                    <p>Descripción del empleado 1.</p>
                </div>
                <div className={styles.serviceBox}>
                    <h2>Empleado 2</h2>
                    <p>Descripción del empleado 2.</p>
                </div>
                <div className={styles.serviceBox}>
                    <h2>Empleado 3</h2>
                    <p>Descripción del empleado 3.</p>
                </div>
                </div>
            </a>
            <a href="/HomePage">
                <h1 className="subtitle"style={{margin:"5vh"}}>Nuestros proveedores</h1>
                <div className={styles.tarjetaCont}>
                    <div className={styles.serviceBox}>
                        <h2>Proveedor 1</h2>
                        <p>Descripción del proveedor 1.</p>
                    </div>
                    <div className={styles.serviceBox}>
                        <h2>Proveedor 2</h2>
                        <p>Descripción del proveedor 2.</p>
                    </div>
                    <div className={styles.serviceBox}>
                        <h2>Proveedor 3</h2>
                        <p>Descripción del proveedor 3.</p>
                    </div>
                </div>
            </a>
            <div style={{transform:"translateY(5vh)"}}>
                <TopBar text="" menu={false} ></TopBar>
            </div>
        </div>
    )
}

export default HomePage;