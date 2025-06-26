import type React from "react";
import styles from "./MenuDespegable.module.css";

//icons
import arrowLeft_circle from "../../assets/Arrow left-circle.png";
import box from "../../assets/Box.png";
import home from "../../assets/Home.png";
import menu from "../../assets/Menu.png";
import more_horizontal from "../../assets/More horizontal.png";
import search from "../../assets/Search.png";
import user from "../../assets/User.png";
import { useState } from "react";

const MenuDespegable: React.FC = () => {
    const [activo, setActivo] = useState(false);

    const alternarMenu = () => setActivo(!activo);

    const cerrarMenu = () => setActivo(false);

    return(
        <div>
            {/*Boton Hamburguesa */}
            <button className={`${styles.hamburguesa} ${activo ? styles.activo : ''}`}
                onClick={alternarMenu}>☰
            </button>

            {/*Overlay oscuro*/}
            {activo && <div className={styles.overlay} onClick={cerrarMenu}></div>}

            <nav className={`${styles.menu} ${activo ? styles.activo : ''}`}>
                <h2 className={styles.h2}>Menu</h2>
                <ul>
                    <li><a href="/"><img src={home} alt="Inicio" /> Inicio</a></li>
                    <li><a href="/Busqueda"><img src={search} alt="Buscar" /> Busqueda</a></li>
                    <li><a href="/Proveedores"><img src={box} alt="Proveedores" /> Proveedores</a></li>
                    <li><a href="/AboutUs"><img src={more_horizontal} alt="Sobre nosotros" /> Sobre M&U</a></li>
                    <li><a href="/Usuario"><img src={user} alt="Usuario" /> Usuario</a></li>
                    <li><a href="/Salir"><img src={arrowLeft_circle} alt="Salir" /> Salir</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default MenuDespegable;