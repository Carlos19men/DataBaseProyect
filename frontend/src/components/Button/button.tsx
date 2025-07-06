import React from "react";
import styles from "./button.module.css";

interface BotonProps {
  texto: string;
  onClick?: () => void;
  inactivo?: boolean ;
  viewHeight?: number;
   fuente?: number; 
  selected?: boolean;
  disabled?: boolean;
}

const Button : React.FC<BotonProps> = ({ texto, onClick, inactivo=false,viewHeight ,fuente, selected, disabled }) => {
    
    if (!fuente) {
        if(!viewHeight){
        fuente = 4; 
        }else{
            fuente = viewHeight - 2;
        }   
    }
    return(
        <span className={styles.container} >
            <button className={`${styles.button} ${inactivo ? styles.inactivo : ""} ${selected ? styles.selected : ""}`} onClick={onClick}  style={{height:`${viewHeight}vh`, padding:"0 5%"}} disabled={disabled}><span className={styles.buttonText} style={{ fontSize:`${fuente}vh`}}>{texto}  </span></button>
        </span>
    )
}

export default Button;