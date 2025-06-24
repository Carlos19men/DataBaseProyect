import React from "react";
import styles from "./Logo.module.css";
import logo from "../../assets/logo.png";

const Logo: React.FC = () => (
    <div className={styles.container}>
        <div className="Rectangle"></div>
        <img src={logo} alt="logo" className={styles.logo_image}/>
    </div>
);

export default Logo;