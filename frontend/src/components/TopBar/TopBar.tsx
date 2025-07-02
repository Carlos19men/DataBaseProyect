import styles from "./TopBar.module.css";
import MenuDespegable from "../Menu Desplegable/MenuDesplegable";

interface TopBarProps {
  text: string;
  menu: boolean;  // si es verdadero tendra menu
}

const TopBar: React.FC<TopBarProps> = ({text,menu}) => {
    return(
        <div className={styles.bar}>
            {menu && <MenuDespegable ></MenuDespegable>}
            <h1 className={styles.subtitle}>{text}</h1> 
        </div>
    )
}

export default TopBar;