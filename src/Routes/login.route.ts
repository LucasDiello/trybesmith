import { Router } from 'express';
import loginController from '../controller/login.controller';

const loginRoute = Router();

loginRoute.post('/', loginController.verifyLogin);

export default loginRoute;