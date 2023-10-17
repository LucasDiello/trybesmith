import { Request, Response } from 'express';
import productService from '../services/products.service';
import mapStatushttps from '../utils/mapStatusHttp';

const postProduct = async (req: Request, res: Response): Promise<Response> => {
  const { status, data } = await productService.postProduct(req.body);
            
  return res.status(mapStatushttps(status)).json(data);
};

export default { postProduct };
