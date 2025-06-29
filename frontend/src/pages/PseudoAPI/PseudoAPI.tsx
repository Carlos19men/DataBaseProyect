import React, { useEffect, useState } from "react";
import styles from "./PseudoAPI.module.css"


const PseudoAPI: React.FC = () => {
  
    //GETS DE LOS ENDPOINTS SIN VARIABLES 


const establecimientos = JSON.stringify(usegetAllAPI("establishement"),null,2);
const empleados = JSON.stringify(usegetAllAPI("employee"),null,2);
const proveedores = JSON.stringify(usegetAllAPI("suppliers"),null,2);
const inventarios = JSON.stringify(usegetAllAPI("inventory"),null,2);
const marcas = JSON.stringify(usegetAllAPI("brand"),null,2);
const servicios = JSON.stringify(usegetAllAPI("servicie"),null,2);
const clientes = JSON.stringify(usegetAllAPI("customer"),null,2);
const productos = JSON.stringify(usegetAllAPI("product"),null,2);
const modelos = JSON.stringify(usegetAllAPI("model"),null,2);
const especializados = JSON.stringify(usegetAllAPI("specializedEmployee"),null,2);
const ofrecidos = JSON.stringify(usegetAllAPI("offered-services"),null,2);


//GETS con variables
    let parse2= usegetById("establishement","J-11223344-5");
    const  estPorId= JSON.stringify(parse2, null, 2);

    const empleadosPorId=JSON.stringify(usegetById("employee","12345724"), null, 2);
    const proveedoresPorId=JSON.stringify(usegetById("suppliers","J-50077889-1"), null, 2);
    const inventariosPorId=JSON.stringify(usegetById("inventory",1), null, 2);
    const marcasPorId=JSON.stringify(usegetById("brand",1), null, 2);
    const serviciosPorId=JSON.stringify(usegetById("servicie",1), null, 2);
    const clientesPorId=JSON.stringify(usegetById("customer",1), null, 2);
    const productosPorId =JSON.stringify(usegetById("product",1), null, 2);
    const modelosPorId =JSON.stringify(usegetById("model",1), null, 2);
    const especializadosPorId = JSON.stringify(usegetById("specializedEmployee/ci","12345758"), null, 2);
    const ofrecidosPorId =JSON.stringify(usegetById("offered-services/rif","J-50077889-1"), null, 2);

    //const asignado = getAllAsign();
    //const prueba=addEst('5',null,'1','1',new Date());


    const [visiblePorId, setVisiblePorId] = useState(false);
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
    <button onClick={() => setVisiblePorId(v => !v)}>
    {visiblePorId ? "Ocultar Consultas por ID" : "Mostrar Consultas por ID"}
    </button>
    {visiblePorId && (
      <div className={styles.seccion}>
        <div>EST: {estPorId}</div>
        <div>EMP:   {empleadosPorId}</div>
        <div>PROV:  {proveedoresPorId}</div>
        <div>INV:   {inventariosPorId}</div>
        <div>MARCA: {marcasPorId}</div>
        <div>SERV:  {serviciosPorId}</div>
        <div>CLI:   {clientesPorId}</div>
        <div>PROD:  {productosPorId}</div>
        <div>MOD:   {modelosPorId}</div>
        <div>ESP:   {especializadosPorId}</div>
        <div>OFR:   {ofrecidosPorId}</div>
      </div>
    )}

</div>
);
}
export default PseudoAPI;


export function usegetAllAPI(url: string) {
  const [data, setData] = useState<string>("Cargando...");

  useEffect(() => {
    fetch("http://localhost:1234/" + url)
      .then(res => res.json())
      .then(lista => setData(lista))
      .catch(err => setData("Solicitud falló con: " + err));
  }, [url]);

  return data;
}


export function usegetById(url:string, ID:string | number){

const [formato, setFormato] = useState<string>("Cargando");

    useEffect(() => {

    fetch(`http://localhost:1234/${url}/${ID}`,{
      method:"GET",
      headers:{'Content-Type':'application/json'}})
      .then(respuesta => respuesta.json())
      .then(lista => setFormato(lista))
      .catch(err => setFormato("Solicitud falló con: " + err));
      
      }, []);

return formato;
}

export function useaddEst(RIF: string, CI_PIC: string, name: string, city: string, date_PIC: Date){
    useEffect(() => {

    fetch('http://localhost:1234/establishement',{method:"POST" ,headers: {'Content-Type': 'application/json'},body: JSON.stringify({RIF, CI_PIC, name, city, date_PIC})})
      .then(respuesta => respuesta.json())
      .catch(err => ("Solicitud falló con: " + err));
      
      }, []);

return JSON.stringify({RIF, CI_PIC, name, city, date_PIC})
}


export function usedeleteEst(RIF: string){
    useEffect(() => {

    fetch('http://localhost:1234/establishement',{method:"DELETE" ,headers: {'Content-Type': 'application/json'},body: JSON.stringify({RIF})})
      .then(respuesta => respuesta.json())
      .catch(err => ("Solicitud falló con: " + err));
      
      }, []);

return JSON.stringify({RIF})
}

export function useupdateEst(RIF: string, CI_PIC?: string, name?: string, city?: string, date_PIC?: Date){
    useEffect(() => {

    fetch('http://localhost:1234/establishement',{method:"PATCH" ,headers: {'Content-Type': 'application/json'},body: JSON.stringify({RIF, CI_PIC, name, city, date_PIC})})
      .then(respuesta => respuesta.json())
      .catch(err => ("Solicitud falló con: " + err));
      
      }, []);

return JSON.stringify({RIF, CI_PIC, name, city, date_PIC})
}
