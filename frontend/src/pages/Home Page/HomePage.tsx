import TopBar from "../../components/TopBar/TopBar";
import styles from "./HomePage.module.css";


const HomePage: React.FC = () => {
    return(
        <div>
            <TopBar text="Inicio" menu={true}></TopBar>
            <h1 className="subtitle">En M&U ofrecemos los siguientes servicios</h1>
        </div>
    )
}

export default HomePage;