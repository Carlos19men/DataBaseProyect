import { useState } from "react";
import TextBoxMU from "../../components/TextBoxMU/TextBoxMU";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./HomePage.module.css";


const HomePage: React.FC = () => {
    const [prueba, setPrueba] = useState('');
    
    const handelChangePrueba = (e:any) => {
        setPrueba(e.target.value);
    }

    return(
        <div>
            <TopBar text="Inicio" menu={true}></TopBar>
            <h1 className="subtitle">En M&U ofrecemos los siguientes servicios</h1>
            <TextBoxMU etiqueta="prueba" viewWidth={60} value={prueba} onChange={handelChangePrueba}></TextBoxMU>
            <TopBar text={prueba} menu={true}></TopBar>
        </div>
    )
}

export default HomePage;