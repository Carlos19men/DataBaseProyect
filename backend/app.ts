import express, { json } from "express";
import { corsMidleware } from "./middelware/cors";
import { connectToDatabase } from "./config/SQLserverConection";
import { createEstablishmentRouter } from "./routers/routerEstablecimiento";
import { createEmployeeRouter } from "./routers/routerEmpleado";
import { createSuppliersrouter } from "./routers/routerProveedores";
import {createInventoryRouter} from "./routers/routerInventario";
import { createbrandRouter } from "./routers/routerMarca";
import { createCustomerRouter } from "./routers/routerClientes";
import { createProductosRouter } from "./routers/routerProductos";
import { createModelsRouter } from "./routers/routerModelos";
import { createAsignedEmployeeRouter } from "./routers/routerEmpleadosAsignados";
import { createServiceRouter } from "./routers/RouterServicios";
import { createEmpleadosEspecializadosRouter } from "./routers/routerEmpleadosEspecializados";
import { createOfferedServicesRouter } from "./routers/routerServiciosOfrecidos";
import { createFamilyProductsRouter } from "./routers/routerFamiliaProductos";
import { createInvoicePaymentsRouter } from "./routers/routerPagosFactura";

connectToDatabase()

export const createApp = () =>{

    console.log('creando App')
    const app = express()
    app.use(json())
    app.use(corsMidleware())
    app.disable('x-powered-by')

    //aplanando la aplicacion 

    //Establecimientos 
    app.use('/establishement', createEstablishmentRouter());
    app.use('/employee', createEmployeeRouter());
    app.use('/suppliers', createSuppliersrouter());
    app.use('/inventory', createInventoryRouter());
    app.use('/brand', createbrandRouter());
    app.use('/servicie',createServiceRouter())
    app.use('/customer',createCustomerRouter())
    app.use('/product',createProductosRouter())
    app.use('/model', createModelsRouter());
    app.use('/assignedEmployee', createAsignedEmployeeRouter());
    app.use('/specializedEmployee', createEmpleadosEspecializadosRouter());
    app.use('/offered-services', createOfferedServicesRouter());
    app.use('/family-products', createFamilyProductsRouter());
    app.use('/invoice-payments', createInvoicePaymentsRouter());
    //app.use('/buys-order', createBuysOrderRouter());

    
    const PORT = process.env.PORT ?? 1234

    //Escuchando el puerto 
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`)
    })

    return app
}

createApp()