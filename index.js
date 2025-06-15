const express = require('express')
app = express()

const getConnection = require('./backend/modules/SQLServer/conection.js')
(async () => {
    try {
        const connection = await getConnection()
        console.log("Conexion establecida")
    }catch (error){
        console.error("Error al establecer una conexion")
    }

})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto ${PORT}`)
})