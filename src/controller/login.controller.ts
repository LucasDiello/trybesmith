import { Request, Response } from 'express';
import loginService from '../services/login.service';
import mapStatushttps from '../utils/mapStatusHttp';

const verifyLogin = async (req : Request, res : Response): Promise<void> => {
  const { status, data } = await loginService.verifyLogin(req.body);

  res.status(mapStatushttps(status)).json(data);
};

export default {
  verifyLogin,
};