import { useState } from "react";
import styles from "./OptionToggle.module.css";


const OptionToggle: React.FC = () => {
    const [rol, setRol] = useState<'cliente' | 'empleado'>('cliente');
    return (
        <div className={styles.toggle}>
            <span
                onClick={() => setRol('cliente')}
                className={rol === 'cliente' ? styles.opcionActiva : styles.opcion}>
                Cliente
            </span>
            <span
                onClick={() => setRol('empleado')}
                className={rol === 'empleado' ? styles.opcionActiva : styles.opcion}
            >
                Empleado
            </span>
        </div>
  )
}

export default OptionToggle;