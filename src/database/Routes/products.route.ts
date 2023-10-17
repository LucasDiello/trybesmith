import { Router } from 'express';
import productsController from '../../controller/products.controller';

const productRoute = Router();

productRoute.post('/', productsController.postProduct);
productRoute.get('/', productsController.getAllProducts);
export default productRoute;