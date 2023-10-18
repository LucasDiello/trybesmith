const validPassword = 'terrível';
const validUsername = 'Hagar';
const noUsername = { username: '', password: validPassword };
const noPassword = { username: validUsername, password: '' };
const notExistingUserBody = { username: 'jonsons', password: validPassword };
const existingUserWithWrongPasswordBody = { username: validUsername, password: 'wrong_password' };
const hashedPassword = '$2a$10$lQGsGScdxhjGRuYVJX3PX.347IWLNiSk6hOiMmjxlzLEI32lg5LMW';

const existingUser = { 
  username: validUsername,
  vocation: 'Guerreiro',
  level: 1,
  password: hashedPassword,
};

const validLoginBody = { username: validUsername, password: validPassword };



export default {
  noUsername,
    notExistingUserBody,
    existingUserWithWrongPasswordBody,  
    existingUser,
    noPassword,
    validLoginBody, 
};