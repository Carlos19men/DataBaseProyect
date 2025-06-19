import express, { json } from "express";
import { corsMidleware } from "./middelware/cors";
import { connectToDatabase } from "./modules/SQLServer/modules";

connectToDatabase()


export const createApp = () =>{

    console.log('creando App')
    const app = express()
    app.use(json())
    app.use(corsMidleware())
    app.disable('x-powered-by')

    //aplanando la aplicacion 
    app.get('/',(req,res) => {
        req.accepted
        res.status(200).send('<h1>Hola desde Node</h1>')
    })


    const PORT = process.env.PORT ?? 1234

    //Escuchando el puerto 
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`)
    })

    return app
}

createApp()