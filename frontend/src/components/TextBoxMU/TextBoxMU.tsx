import styles from './TextBoxMU.module.css'



interface TextBoxMUProps {
  etiqueta: string;
  viewWidth: number;
  viewHeight?: number; // Optional, not used in this component
}

const TextBoxMU: React.FC<TextBoxMUProps> = ({ etiqueta, viewWidth,viewHeight }) => {
  return (
    <span className={styles.container}>
      <span className={styles.texto} style={{height:`${viewHeight}vh`}}>{etiqueta}</span>
        <input type="text" className={styles.barra} style={{width:`${viewWidth}vw`,height:`${viewHeight}vh`}}></input>
    </span>
  );
};

export default TextBoxMU