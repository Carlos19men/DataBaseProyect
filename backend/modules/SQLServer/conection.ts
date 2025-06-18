const sql = require('mssql')

const dbsettings = {
    user: "test_user",
    password: "Us12345*",
    server: "localhost",
    database: "Nomina_Empleados",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

const getConnection = async () => {
    try {
        const pool = await sql.connect(dbsettings)
        const result = await pool.request().query("Select * from empleado")
        console.log(result)

        return pool
    } catch (error) {
        console.error(error)
    }
};


module.exports = getConnection;
