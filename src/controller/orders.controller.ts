import { Request, Response } from 'express';
import OrdersService from '../services/orders.service';
import mapStatushttps from '../utils/mapStatusHttp';

const getAllOrders = async (_req: Request, res: Response): Promise<void> => {
  const { status, data } = await OrdersService.getAllOrders();
  res.status(mapStatushttps(status)).json(data);
};

export default { getAllOrders };