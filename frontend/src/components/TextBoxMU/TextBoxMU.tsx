import styles from './TextBoxMU.module.css'



interface TextBoxMUProps {
  etiqueta: string;
  viewWidth: number;
}

const TextBoxMU: React.FC<TextBoxMUProps> = ({ etiqueta, viewWidth }) => {
  return (
    <span className={styles.container}>
      <span className={styles.texto}>{etiqueta}</span>
        <input type="text" className={styles.barra} style={{width:`${viewWidth}vw`}}></input>
    </span>
  );
};

export default TextBoxMU