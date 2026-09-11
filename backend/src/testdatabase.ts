import pool from './database.js';



async function testConnection() {
    let client = undefined;
    try {
        client = await pool.connect();
        const result = await client.query('SELECT 1'  );
        console.log(result.rows);
        
    }
   
    catch (err) {
        console.error('Database connection error', err);
    }
    finally {if (client) { client.release(); } }
}

testConnection();



