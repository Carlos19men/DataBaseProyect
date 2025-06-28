import React, { useEffect, useState } from "react";
import Button from "../../components/Button/button";
import styles from "./PseudoAPI.module.css"



const PseudoAPI: React.FC = () => {
  
    const establecimientos=getAllEst();
    const empleados=getAllEmp();
    const proveedores=getAllProv();
    const inventarios=getAllInv();
    const marcas=getAllMarcas();
    const servicios=getAllserv();
    const clientes=getAllCli();
    const productos =getAllProd();
    const prueba=addEst('1','1','1','1',new Date());


    const establecimientosPost = addEst('1','1','d','d',new Date())
  
  return (
    <div className="pseudoapi">
      <h1>Pseudo API</h1>
      <h2>Establecimientos</h2>

      <div className={styles.pseudoapi}>
        <pre>{establecimientosPost}</pre>
      </div>

      <div className={styles.pseudoapi}>
        <pre>{establecimientos}</pre>
      </div>
      <pre>{prueba}</pre>
      <h2>Empleados</h2>
      <div className={styles.pseudoapi}>
        <pre>{empleados}</pre>
      </div>

      <h2>Proveedores</h2>
      <div className={styles.pseudoapi}>
        <pre>{proveedores}</pre>
      </div>

      <h2>Inventarios</h2>
      <div className={styles.pseudoapi}>
        <pre>{inventarios}</pre>
      </div>

      <h2>Marcas</h2>
      <div className={styles.pseudoapi}>
        <pre>{marcas}</pre>
      </div>

      <h2>Servicios</h2>
      <div className={styles.pseudoapi}>
        <pre>{servicios}</pre>
      </div>

      <h2>Clientes</h2>
      <div className={styles.pseudoapi}>
        <pre>{clientes}</pre>
      </div>

      <h2>Productos</h2>
      <div className={styles.pseudoapi}>
        <pre>{productos}</pre>
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

      formato.replace("[",""); // Elimina las comillas de las claves
      formato.replace("]",""); 
      
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


function addEst(RIF: string, CI_PIC: string, name: string, city: string, date_PIC: Date){
    useEffect(() => {

    fetch('http://localhost:1234/establishement',{method:"POST" ,headers: {'Content-Type': 'application/json'},body: JSON.stringify({RIF, CI_PIC, name, city, date_PIC})})
      .then(respuesta => respuesta.json())
      .catch(err => ("Solicitud falló con: " + err));
      
      }, []);

return JSON.stringify({RIF, CI_PIC, name, city, date_PIC})
}

/*
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
}*/
function addEst(RIF: string, CI_PIC: string, name: string, city: string, date_PIC: Date){
    useEffect(() => {

    fetch('http://localhost:1234/establishement',{method:"POST", body: JSON.stringify({RIF, CI_PIC, name, city, date_PIC})})
      .then(respuesta => respuesta.json())
      .catch(err => ("Solicitud falló con: " + err));
      
      }, []);

return "Solicitud enviada"
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
*/
