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
{viewWidth !== 0 ? (
      <input
        type="text"
        className={styles.barra}
        placeholder={ejemplo}
        style={{width:`${viewWidth}vw`, height:`${viewHeight}vh`, fontSize:`100%`}}
        value={value}
        onChange={onChange}
      />
    ) : null}

    </span>
  );
};

export default TextBoxMU