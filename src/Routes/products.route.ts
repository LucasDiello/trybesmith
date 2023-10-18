import { Router } from 'express';
import productsController from '../controller/products.controller';

const productRoute = Router();

productRoute.get('/', productsController.getAllProducts);
productRoute.post('/', productsController.postProduct);

export default productRoute;