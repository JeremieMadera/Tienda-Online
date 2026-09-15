import {registerUser} from './auth.service.js'
import pool from '../database.js';


async function testRegisterUser(email: string, password: string) {
  const user = await registerUser(email, password);
  return user;
}
try {
  const user = await testRegisterUser('test3@example.com', 'password123');
  console.log(user);
}
catch (error) {
  
  console.error('Error during test:', error);
}

finally {
  await pool.end();
}








