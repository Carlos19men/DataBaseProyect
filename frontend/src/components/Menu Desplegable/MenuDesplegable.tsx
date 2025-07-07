import type React from "react";
import styles from "./MenuDespegable.module.css";

//icons
import arrowLeft_circle from "../../assets/Arrow left-circle.png";
import box from "../../assets/Box.png";
import home from "../../assets/Home.png";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
import more_horizontal from "../../assets/More horizontal.png";
import search from "../../assets/Search.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuDespegable: React.FC = () => {
    const [activo, setActivo] = useState(false);

    const alternarMenu = () => setActivo(!activo);

    const cerrarMenu = () => setActivo(false);
    const navigator = useNavigate();
    return(
        <div>
            {/*Boton Hamburguesa */}
            <button className={`${styles.hamburguesa} ${activo ? styles.activo : ''} `}
                onClick={alternarMenu}>☰
            </button>

            {/*Overlay oscuro*/}
            {activo && <div className={styles.overlay} onClick={cerrarMenu}></div>}

            <nav className={`${styles.menu} ${activo ? styles.activo : ''}`}>
                    
                <div className={styles.menuVerde}> 
                    <ul className={styles.h2} style={{padding: "0"}}>
                        <div style={{ height:"12vh",marginTop: "5vh",marginBottom: "5vh",paddingBottom:"1vh",fontSize: "10vh"}}>Menu</div>
                    </ul>  
                    <ul>

                        <li><a href="/"><img src={home} alt="Inicio" /> Inicio</a></li>
                        <li><a href="/Search"><img src={search} alt="Buscar" /> Busqueda</a></li>
                        <li><a href="/Inventario"><img src={box} alt="Inventario" /> Inventario</a></li>
                        <li>
                            <a onClick={() => {cerrarMenu(); navigator("/ordenes-servicio");}} style={{cursor: "pointer"}}>
                                <img src={box} alt="Ordenes Servicio" /> Ordenes Servicio
                            </a>
                        </li>
                        <li>
                            <a onClick={() => {cerrarMenu(); navigator("/AboutUs");}} style={{cursor: "pointer"}}>
                                <img src={more_horizontal} alt="Sobre nosotros" /> Sobre Nosotros
                            </a>
                        </li>
                        <li><a onClick={() => {localStorage.removeItem("isLoggedIn");navigator("/login");} }><img src={arrowLeft_circle} alt="Salir" onClick={() => {localStorage.removeItem("isLoggedIn");navigator("/login");}} /> Salir</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default MenuDespegable;