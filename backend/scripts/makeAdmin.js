import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const email = process.argv[2];

if (!email) {
  console.error("❌ Por favor, proporciona un correo. Ejemplo: npm run make-admin -- juan@gmail.com");
  process.exit(1);
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function makeAdmin() {
  try {
    await client.connect();
    const result = await client.query("UPDATE users SET role = 'admin' WHERE email = $1 RETURNING *", [email]);
    
    if (result.rowCount === 0) {
      console.log(`⚠️ No se encontró ningún usuario con el correo: ${email}`);
    } else {
      console.log(`✅ ¡Éxito! El usuario ${email} ahora es administrador.`);
    }
  } catch (error) {
    console.error("❌ Ocurrió un error:", error);
  } finally {
    await client.end();
  }
}

makeAdmin();
