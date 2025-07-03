import Logo from "../../components/Logo/Logo";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./VisualizarFactura.module.css";

const VisualizarFactura: React.FC = () =>{
    return(
        <div>
            <TopBar menu={false} text="Visualizar Factura"></TopBar>
            <div className={styles.facturaContainer}>
                <div className={styles.containerMain}>
                    <div className={styles.logo}>
                        <Logo view={15}></Logo>
                        <div className={styles.subtitle}>
                            <h2 className="title">M&U</h2>
                        </div>
                    </div>
                    <div className={styles.subtitle}>
                        <h2 className="title">FACTURA</h2>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.subtitle}>
                        <h2 className="subtitle">INFORMACION DEL CLIENTE:</h2>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">CI:</h1>
                            </div>
                            <h1 className="minitext">XXXXXX</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Nombre:</h1>
                            </div>
                            <h1 className="minitext">XXXXXX</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Direccion:</h1>
                            </div>
                            <h1 className="minitext">XXXXXX</h1>
                        </div>
                    </div>
                    <div className={styles.subtitle}>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Nº FACTURA:</h1>
                            </div>
                            <h1 className="minitext">XXXXXX</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Fecha:</h1>
                            </div>
                            <h1 className="minitext">XXXXXX</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.subtitle}>
                        <h2 className="subtitle">INFORMACION DEL ESTABLECIMIENTO:</h2>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Nombre:</h1>
                            </div>
                            <h1 className="minitext">XXXXXX</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">RIF:</h1>
                            </div>
                            <h1 className="minitext">XXXXXX</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.subtitle}>
                        <h2 className="subtitle">INFORMACION DEL VEHICULO:</h2>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Placa del Vehiculo:</h1>
                            </div>
                            <h1 className="minitext">XXXXXX</h1>
                        </div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">ID del Vehiculo:</h1>
                            </div>
                            <h1 className="minitext">XXXXXX</h1>
                        </div>
                    </div>
                    <div className={styles.subtitle}>
                        <div className={styles.elements}>&nbsp;</div>
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Fecha entrada:</h1>
                            </div>
                            <h1 className="minitext">XXXXXX</h1>
                        </div> 
                        <div className={styles.elements}>
                            <div className={styles.greentext}>
                                <h1 className="minitext">Fecha salida:</h1>
                            </div>
                            <h1 className="minitext">XXXXXX</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VisualizarFactura;