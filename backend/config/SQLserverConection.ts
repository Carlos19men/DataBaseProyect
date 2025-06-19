// app.ts (o server.ts)
import sql_ from 'mssql';
import dotenv from 'dotenv';
import { ConnectionPool } from 'mssql'; // Importa la interfaz para tipar el pool

dotenv.config();


const config = {
    server: process.env.DB_SERVER as string, // Afirmación de tipo
    database: process.env.DB_NAME as string, // Afirmación de tipo
    user: process.env.DB_USER as string,
    password: '12345678',
    options: {
        trustedConnection: true,
        integratedSecurity: true,
        trustServerCertificate: true,
    },
};


// Variable para almacenar el pool de conexiones resuelto, tipada
let pool: ConnectionPool | null = null; // <--- CAMBIO AQUÍ: Ahora almacena la ConnectionPool directamente

// Función para conectar a la base de datos
export async function connectToDatabase(): Promise<ConnectionPool> { // La función ahora devuelve el pool conectado
    try {
        // Verifica si el pool ya existe Y está conectado
        if (pool && pool.connected) {
            console.log('✅ Ya conectado a la base de datos.');
            return pool;
        }
        
        // Conecta al pool de conexiones de SQL Server y asigna el resultado
        pool = await sql_.connect(config);
        console.log('✅ Conexión exitosa a la base de datos SQL Server con Autenticación de Windows.');
        return pool;
    } catch (err: unknown) {
        console.error('❌ Error al conectar a la base de datos:', (err as Error).message || err);
        // Es importante cerrar el pool en caso de error
        if (pool && pool.connected) { // Verifica si el pool existe y está conectado antes de intentar cerrar
            await pool.close(); // <--- pool ahora es ConnectionPool, no Promise<ConnectionPool>
        }
        pool = null; // Reinicia el pool a null en caso de fallo    
        throw err; // Re-lanza el error para que quien llame a la función pueda manejarlo
    }
}

// Función para obtener el pool de conexiones (útil para otras partes de la app)
export function getDbPool(): ConnectionPool {
    if (!pool || !pool.connected) {
        throw new Error('No hay conexión activa a la base de datos. Asegúrate de llamar a connectToDatabase() primero y esperar su resolución.');
    }
    return pool;
}

// Función para cerrar la conexión de la base de datos
export async function closeDatabaseConnection(): Promise<void> {
    if (pool && pool.connected) {
        console.log('Cerrando conexión a la base de datos...');
        await pool.close();
        pool = null;
        console.log('Conexión a la base de datos cerrada.');
    } else {
        console.log('No hay conexión activa para cerrar.');
    }
}