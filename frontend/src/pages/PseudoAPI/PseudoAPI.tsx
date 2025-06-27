import React, { useEffect, useState } from "react";
import Button from "../../components/Button/button";
import styles from "./PseudoAPI.module.css"



const PseudoAPI: React.FC = () => {
  
    const establecimientos=getAllEst();
  
  return (
    <div className="pseudoapi">
      <h1>Pseudo API</h1>
      <div className={styles.pseudoapi}>
        <pre>{establecimientos}</pre>
      </div>
    </div>
  );
};

export default PseudoAPI;

function getAllEst(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/establishement')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}

function getAllEmp(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/employee')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}
function getAllProv(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/suppliers')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}
function getAllInv(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/inventory')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}
function getAllMarcas(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/brand')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}
function getAllserv(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/servicie')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}
function getAllCli(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/customer')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}
function getAllProd(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/product')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}
/*
function getAllEst(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/establishement')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}
function getAllEst(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/establishement')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}
function getAllEst(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/establishement')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}
function getAllEst(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/establishement')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}
function getAllEst(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/establishement')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}
function getAllEst(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/establishement')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}
function getAllEst(){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch('http://localhost:1234/establishement')
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato
}
*/