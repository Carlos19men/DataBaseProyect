import styles from './TextBoxMU.module.css'

interface TextBoxMUProps {
  etiqueta: string;
  viewWidth: number;
  viewHeight?: number; // Optional, not used in this component
  value?: string; 
  onChange?: any;
}

const TextBoxMU: React.FC<TextBoxMUProps> = ({ 
  etiqueta, viewWidth,viewHeight,value,onChange
  }) => {

  return (
    <span className={styles.container}>
      <span className={styles.texto} style={{height:`${viewHeight}vh`}}>{etiqueta}</span>
        <input type="text" className={styles.barra} style={{width:`${viewWidth}vw`,height:`${viewHeight}vh`}}
        value={value} onChange={onChange}></input>
    </span>
  );
};

export default TextBoxMU