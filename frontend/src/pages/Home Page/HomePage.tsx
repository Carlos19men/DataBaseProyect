import { useState } from "react";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./HomePage.module.css";


const HomePage: React.FC = () => {

    return(
        <div>
            <TopBar text="Inicio" menu={true}></TopBar>
            <h1 className="subtitle">En M&U ofrecemos los siguientes servicios</h1>
            <div style={{height:"50vh", display:"grid", gridTemplateColumns:"repeat(3, 1fr)", background:"lightgray"}}>
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
        </div>
    )
}

export default HomePage;