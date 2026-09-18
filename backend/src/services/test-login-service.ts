import {loginUser} from './auth.service.js';
import pool from '../database.js';

async function testLoginUser(email: string, password: string) {
  const user = await loginUser(email, password);
  return user;
}
try {
    switch (process.argv[2]) {
    
        case 'valid': {
            const user = await testLoginUser('test@example.com', 'password123');
            console.log(user);
            break;
        }
        case 'invalid credentials': {
            try {
                await testLoginUser('test@example.com', 'wrongpassword');
                console.error('Test failed: login succeeded with an incorrect password.');
            } catch (error) {
                if (error instanceof Error && error.message === 'Invalid credentials') {
                    console.log('Test passed: incorrect password was rejected.');
                } else {
                    console.error('Test failed: unexpected error while testing invalid credentials.', error);
                }
            }
            break;
        }
        case 'inexistent email': {
            try {
                await testLoginUser('nonexistent@example.com', 'password123');
                console.error('Test failed: login succeeded with an unknown email.');
            } catch (error) {
                if (error instanceof Error && error.message === 'Invalid credentials') {
                    console.log('Test passed: unknown email was rejected.');
                } else {
                    console.error('Test failed: unexpected error while testing inexistent email.', error);
                }
            }
            break;
        }
        default:
            console.error('Invalid test function name');
            process.exit(1);
    }
  
    
 
  
  
  
} catch (error) {
  console.error(error);
}
finally {
  await pool.end();
}
