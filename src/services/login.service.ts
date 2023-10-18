import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { Login } from '../types/Login';
import jwt from '../middleware/auth.validation';
import { ServiceResponse } from '../types/ServiceResponse';
import { Token } from '../types/Token';

const verifyLogin = async (login: Login) : Promise<ServiceResponse<Token>> => {
  if (!login.username || !login.password) {
    return { status: 'INVALID_DATA',
      data: { message: '"username" and "password" are required' } };
  }
  const foundUser = await UserModel.findOne({ where: { username: login.username } });

  if (!foundUser || !bcrypt.compareSync(login.password, foundUser.dataValues.password)) {
    return { status: 'UNAUTHORIZED',
      data: { message: 'Username or password invalid' } };
  }

  const { id, username } = foundUser.dataValues;

  const token = jwt.generateToken({ id, username });

  return { status: 'SUCCESSFUL', data: { token } };
};

export default {
  verifyLogin,
};