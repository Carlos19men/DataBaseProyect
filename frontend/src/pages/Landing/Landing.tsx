import Button from "../../components/Button/button";
import LandingBG from "../../components/LandingBG/LandingBG";
import Logo from "../../components/Logo/Logo";
import styles from "./Landing.module.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Landing: React.FC = () => {
    const navigate = useNavigate();

    return(
        <div className={styles.container}>
           <LandingBG></LandingBG>
           
            <div className={styles.oculto}></div>
            <Logo></Logo> 
             <div className={styles.oculto}></div>
            <div className={styles.titles}>
                <h1 className="title">Multiservicios Universal M&U</h1>
                <h2 className="subtitle">Una empresa comprometida con el planeta</h2>
            </div>

            
            
            <div className={styles.buttonPart}>
                <Button texto="Iniciar Sesión" onClick={() => navigate('/Login')} ></Button>
                <p className="miniText">No tienes una cuenta?</p>
                <Link to="/Registro" className="miniText">
                    Registrate Aqui
                </Link>
            </div>
            
        </div>

    )
}

export default Landing;