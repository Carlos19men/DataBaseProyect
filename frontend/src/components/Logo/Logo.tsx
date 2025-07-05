import React from "react";
import styles from "./Logo.module.css";
import logo from "../../assets/logo.png";

interface logoProps{
    view?: number; 
}

const Logo: React.FC<logoProps> = ({
    view
}) => (
    <div className={styles.container}> <div className={styles.oculto}></div>
        <div className="Rectangle"></div>
        <img src={logo} alt="logo" className={styles.logo_image} style={{width:`${view}-${view}/2vw`,height:`${view}vh`}}/>
    </div>
);

export default Logo;