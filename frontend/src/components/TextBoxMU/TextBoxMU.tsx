import styles from './TextBoxMU.module.css'

interface TextBoxMUProps {
  etiqueta: string;
  viewWidth: number;
  viewHeight?: number; 
  value?: string; 
  onChange?: any;
  ejemplo:string;
}

const TextBoxMU: React.FC<TextBoxMUProps> = ({ 
  etiqueta, viewWidth,viewHeight,value,onChange,ejemplo
  }) => {

  return (
    <span className={styles.container}>

      <span className={styles.texto}   style={{height:`${viewHeight}vh`}} >{etiqueta}</span>

        <input type="text" className={styles.barra}  placeholder={ejemplo}  style={{width:`${viewWidth}vw`,height:`${viewHeight}vh`,fontSize:`100%`}}
        value={value} onChange={onChange}></input>

    </span>
  );
};

export default TextBoxMU