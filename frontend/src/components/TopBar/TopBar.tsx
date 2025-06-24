import styles from "./TopBar.module.css";

interface TopBarProps {
  text: string;
}

const TopBar: React.FC<TopBarProps> = ({text}) => {
    return(
        <div className={styles.bar}>
            <h1 className="subtitle">{text}</h1>    
        </div>
    )
}

export default TopBar;