import express, { json } from "express";
import { corsMidleware } from "./middelware/cors";
import { connectToDatabase } from "./config/SQLserverConection";
import { createEstablishmentRouter } from "./routers/routerEstablecimiento";

connectToDatabase()


export const createApp = () =>{

    console.log('creando App')
    const app = express()
    app.use(json())
    app.use(corsMidleware())
    app.disable('x-powered-by')

    //aplanando la aplicacion 

    // Importando las rutas
    app.use('/establishement', createEstablishmentRouter())

    const PORT = process.env.PORT ?? 1234

    //Escuchando el puerto 
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`)
    })

    return app
}

createApp()