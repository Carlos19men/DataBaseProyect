import React from "react";
import styles from "./button.module.css";

interface BotonProps {
  texto: string;
  onClick?: () => void;
  inactivo?: boolean ;
}

const Button : React.FC<BotonProps> = ({ texto, onClick, inactivo=false }) => {
    return(
        <span>
            <button className={`${styles.button} ${inactivo ? styles.inactivo : ""}`} onClick={onClick}  ><span className={styles.buttonText}>{texto}</span></button>
        </span>
    )
}

export default Button;