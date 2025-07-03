import React from "react";
import styles from "./button.module.css";

interface BotonProps {
  texto: string;
  onClick?: () => void;
  inactivo?: boolean ;
  viewHeight?: number;
   fuente?: number; 
  selected?: boolean;
}

const Button : React.FC<BotonProps> = ({ texto, onClick, inactivo=false,viewHeight ,fuente, selected }) => {
    
    if (!fuente) {
        if(!viewHeight){
        fuente = 4; 
        }else{
            fuente = viewHeight - 2;
        }   
    }
    return(
        <span>
            <button className={`${styles.button} ${inactivo ? styles.inactivo : ""} ${selected ? styles.selected : ""}`} onClick={onClick}  style={{height:`${viewHeight}vh`, padding:0}}><span className={styles.buttonText} style={{ fontSize:`${fuente}vh`, textAlign:"center"}}>{texto}  </span></button>
        </span>
    )
}

export default Button;