import React from "react";
import styles from "./button.module.css";

interface BotonProps {
  texto: string;
  onClick?: () => void;
}

const Button : React.FC<BotonProps> = ({ texto, onClick }) => {
    return(
        <div>
            <button className={styles.button} onClick={onClick}><span className={styles.buttonText}>{texto}</span></button>
        </div>
    )
}

export default Button;