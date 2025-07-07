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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MenuDespegable: React.FC = () => {
    const [activo, setActivo] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const alternarMenu = () => {
        const nuevoEstado = !activo;
        setActivo(nuevoEstado);
        localStorage.setItem('menuAbierto', nuevoEstado.toString());
    };
    const cerrarMenu = () => {
        setActivo(false);
        localStorage.setItem('menuAbierto', 'false');
    };
    const navigator = useNavigate();

    // Detectar cuando el cursor está cerca de la esquina superior izquierda
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = event.clientX;
            const y = event.clientY;
            
            // Mostrar el menú cuando el cursor esté en la esquina superior izquierda (área de 200x200px)
            if (x <= 200 && y <= 200) {
                setMenuVisible(true);
            } else {
                setMenuVisible(false);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return(
        <div>
            {/*Boton Hamburguesa */}
            <button 
                className={`${styles.hamburguesa} ${activo ? styles.activo : ''} ${menuVisible ? styles.visible : ''}`}
                onClick={alternarMenu}
                style={{ 
                    opacity: menuVisible || activo ? 1 : 0.3,
                    transform: menuVisible || activo ? 'scale(1.1)' : 'scale(1)'
                }}
            >
                ☰
            </button>

            {/*Overlay oscuro*/}
            {activo && <div className={styles.overlay} onClick={cerrarMenu}></div>}

            <nav className={`${styles.menu} ${activo ? styles.activo : ''}`}>
                    
                <div className={styles.menuVerde}> 
                    <div className={styles.h2}>
                        MENÚ
                    </div>  
                    <ul>
                        <li><a href="/"><img src={home} alt="Inicio" /> Inicio</a></li>
                        <li><a href="/Search"><img src={search} alt="Buscar" /> Búsqueda</a></li>
                        <li><a href="/Inventario"><img src={box} alt="Inventario" /> Inventario</a></li>
                        <li><a href="/OrdenesServicio"><img src={box} alt="Ordenes Servicio" /> Órdenes de Servicio</a></li>
                        <li><a href="/AboutUs"><img src={more_horizontal} alt="Sobre nosotros" /> Sobre M&U</a></li>
                        <li><a href="/Usuario"><img src={user} alt="Usuario" /> Usuario</a></li>
                        <li><a onClick={() => {localStorage.removeItem("isLoggedIn");navigator("/login");} }><img src={arrowLeft_circle} alt="Salir" onClick={() => {localStorage.removeItem("isLoggedIn");navigator("/login");}} /> Salir</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default MenuDespegable; 