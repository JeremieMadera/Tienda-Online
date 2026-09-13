import {hashPassword, comparePassword} from './password.js';




try {
  const password = 'myPassword123';
  const hashedPassword = await hashPassword(password);
  

  const isMatch = await comparePassword(password, hashedPassword);
  console.log('Password Match:', isMatch);

  const wrongPassword = 'wrongPassword';
  const isMatchWrong = await comparePassword(wrongPassword, hashedPassword);
  console.log('Wrong Password Match:', isMatchWrong);
}

catch (error) {
  console.error('Error:', error);
}

