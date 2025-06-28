import React, { useEffect, useState } from "react";
import Button from "../../components/Button/button";
import styles from "./PseudoAPI.module.css"
import { createSearchParams, useSearchParams } from "react-router-dom";



const PseudoAPI: React.FC = () => {
  
    //GETS DE LOS ENDPOINTS SIN VARIABLES 

    const establecimientos=getAllAPI("establishement");
    const empleados=getAllAPI("employee");
    const proveedores=getAllAPI("suppliers");
    const inventarios=getAllAPI("inventory");
    const marcas=getAllAPI("brand");
    const servicios=getAllAPI("servicie");
    const clientes=getAllAPI("customer");
    const productos =getAllAPI("product");
    const modelos = getAllAPI("model");
    const especializados = getAllAPI("specializedEmployee");
    const ofrecidos = getAllAPI("offered-services");
    //GETS con variables

    const estPorId= getById("establishement",1);

    
    //const asignado = getAllAsign();
    //const prueba=addEst('5',null,'1','1',new Date());



    const [visible, setVisible] = useState({
    establecimientos: false,
    empleados: false,
    proveedores: false,
    inventarios: false,
    marcas: false,
    servicios: false,
    clientes: false,
    productos: false,
    modelos: false,
    especializados: false,
    ofrecidos: false,
  });

  return (
  <div className={styles.pseudoapi}>

    <div>{estPorId}</div>
    <h1>Pseudo API</h1>
    <div>
    <button onClick={() => setVisible(v => ({ ...v, establecimientos: !v.establecimientos }))}>
      {visible.establecimientos ? "Ocultar Establecimientos" : "Mostrar Establecimientos"}
    </button>
    {visible.establecimientos && (
      <div className={styles.seccion}>
        <pre>{establecimientos}</pre>
      </div>
    )}
    </div>
      <div>
        <button onClick={() => setVisible(v => ({ ...v, empleados: !v.empleados }))}>
          {visible.empleados ? "Ocultar Empleados" : "Mostrar Empleados"}
        </button>
        {visible.empleados && (
          <div className={styles.seccion}>
            <pre>{empleados}</pre>
          </div>
        )}
    </div>
    <div>
        <button onClick={() => setVisible(v => ({ ...v, proveedores: !v.proveedores }))}>
          {visible.proveedores ? "Ocultar Proveedores" : "Mostrar Proveedores"}
        </button>
        {visible.proveedores && (
          <div className={styles.seccion}>
            <pre>{proveedores}</pre>
          </div>
        )}
    </div>
    <div>
        <button onClick={() => setVisible(v => ({ ...v, inventarios: !v.inventarios }))}>
          {visible.inventarios ? "Ocultar Inventarios" : "Mostrar Inventarios"}
        </button>
        {visible.inventarios && (
          <div className={styles.seccion}>
            <pre>{inventarios}</pre>
          </div>
        )}
    </div>
    <div>
        <button onClick={() => setVisible(v => ({ ...v, marcas: !v.marcas }))}>
          {visible.marcas ? "Ocultar Marcas" : "Mostrar Marcas"}
        </button>
        {visible.marcas && (
          <div className={styles.seccion}>
            <pre>{marcas}</pre>
          </div>
        )}
    </div>
    <div>
        <button onClick={() => setVisible(v => ({ ...v, servicios: !v.servicios }))}>
          {visible.servicios ? "Ocultar Servicios" : "Mostrar Servicios"}
        </button>
        {visible.servicios && (
          <div className={styles.seccion}>
            <pre>{servicios}</pre>
          </div>
        )}
    </div>
    <div>
        <button onClick={() => setVisible(v => ({ ...v, clientes: !v.clientes }))}>
          {visible.clientes ? "Ocultar Clientes" : "Mostrar Clientes"}
        </button>
        {visible.clientes && (
          <div className={styles.seccion}>
            <pre>{clientes}</pre>
          </div>
        )}
    </div>
    <div>
        <button onClick={() => setVisible(v => ({ ...v, productos: !v.productos }))}>
          {visible.productos ? "Ocultar Productos" : "Mostrar Productos"}
        </button>
        {visible.productos && (
          <div className={styles.seccion}>
            <pre>{productos}</pre>
          </div>
        )}
    </div>
    <div>
        <button onClick={() => setVisible(v => ({ ...v, modelos: !v.modelos }))}>
          {visible.modelos ? "Ocultar Modelos" : "Mostrar Modelos"}
        </button>
        {visible.modelos && (
          <div className={styles.seccion}>
            <pre>{modelos}</pre>
          </div>
        )}
    </div>
    <div>
        <button onClick={() => setVisible(v => ({ ...v, especializados: !v.especializados }))}>
          {visible.especializados ? "Ocultar Especializados" : "Mostrar Especializados"}
        </button>
        {visible.especializados && (
          <div className={styles.seccion}>
            <pre>{especializados}</pre>
          </div>
        )}
    </div>
    <div>
    <button onClick={() => setVisible(v => ({ ...v, ofrecidos: !v.ofrecidos }))}>
      {visible.ofrecidos ? "Ocultar Servicios Ofrecidos" : "Mostrar Servicios Ofrecidos"}
    </button>
    {visible.ofrecidos && (
      <div className={styles.seccion}>
        <pre>{ofrecidos}</pre>
      </div>
    )}
    </div>
  </div>
);
}
export default PseudoAPI;


export function getAllAPI(url: string) {
  const [data, setData] = useState<string>("Cargando...");

  useEffect(() => {
    fetch("http://localhost:1234/" + url)
      .then(res => res.json())
      .then(lista => setData(JSON.stringify(lista, null, 2)))
      .catch(err => setData("Solicitud falló con: " + err));
  }, [url]);

  return data;
}

function getById(url:string, ID){
const [formato, setFormato] = useState<string>("Cargando...");

    useEffect(() => {

    fetch(`http://localhost:1234/${url}/${ID}`,{
      method:"GET",
      headers:{'Content-Type':'application/json'}})
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(JSON.stringify(lista, null, 2)))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);
console.log(formato);
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
