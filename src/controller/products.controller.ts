import { Request, Response } from 'express';
import productService from '../services/products.service';
import mapStatushttps from '../utils/mapStatusHttp';

const postProduct = async (req: Request, res: Response): Promise<void> => {
  const { status, data } = await productService.postProduct(req.body);
            
  res.status(mapStatushttps(status)).json(data);
};

const getAllProducts = async (_req: Request, res: Response) : Promise<void> => {
  const { status, data } = await productService.getAllProducts();
  res.status(mapStatushttps(status)).json(data);
};

export default { postProduct, getAllProducts };
