import React, { useEffect, useState } from "react";
import Button from "../../components/Button/button";
import styles from "./PseudoAPI.module.css"
import { createSearchParams, useSearchParams } from "react-router-dom";



const PseudoAPI: React.FC = () => {
  
    //GETS DE LOS ENDPOINTS SIN VARIABLES 

    const establecimientos=JSON.stringify(getAllAPI("establishement"), null, 2);
    const empleados=JSON.stringify(getAllAPI("employee"), null, 2);
    const proveedores=JSON.stringify(getAllAPI("suppliers"), null, 2);
    const inventarios=JSON.stringify(getAllAPI("inventory"), null, 2);
    const marcas=JSON.stringify(getAllAPI("brand"), null, 2);
    const servicios=JSON.stringify(getAllAPI("servicie"), null, 2);
    const clientes=JSON.stringify(getAllAPI("customer"), null, 2);
    const productos =JSON.stringify(getAllAPI("product"), null, 2);
    const modelos = JSON.stringify(getAllAPI("model"), null, 2);
    const especializados = JSON.stringify(getAllAPI("specializedEmployee"), null, 2);
    const ofrecidos = JSON.stringify(getAllAPI("offered-services"), null, 2);
    //GETS con variables

   /* const estPorId=JSON.stringify(getById("establishement",1));
   const empleadosPorId=JSON.stringify(getById("employee","12345724"));
    const proveedoresPorId=JSON.stringify(getById("suppliers","J-50077889-1"));
    const inventariosPorId=JSON.stringify(getById("inventory",1));
    const marcasPorId=JSON.stringify(getById("brand",1));
    const serviciosPorId=JSON.stringify(getById("servicie",1));
    const clientesPorId=JSON.stringify(getById("customer",1));
    const productosPorId =JSON.stringify(getById("product",1));
    const modelosPorId =JSON.stringify( getById("model",1));
    const especializadosPorId = JSON.stringify(getById("specializedEmployee",1));
    const ofrecidosPorId =JSON.stringify( getById("offered-services",1));
    */
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
    {/*<div>{estPorId}</div>
   <div>{empleadosPorId}</div>
    <div>{proveedoresPorId}</div>
    <div>{inventariosPorId}</div>
    <div>{marcasPorId}</div>
    <div>{serviciosPorId}</div>
    <div>{clientesPorId}</div>
    <div>{productosPorId}</div>
    <div>{modelosPorId}</div>
    <div>{especializadosPorId}</div>
    <div>{ofrecidosPorId}</div>*/}
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
const [formato, setFormato] = useState<JSON>(JSON.parse("Cargando"));

    useEffect(() => {

    fetch(`http://localhost:1234/${url}/${ID}`,{
      method:"GET",
      headers:{'Content-Type':'application/json'}})
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(lista))
      .catch(err => setFormato(JSON.parse("Solicitud falló con: " + err)));
      
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
