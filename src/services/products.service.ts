import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';

const postProduct = async (product: ProductInputtableTypes): Promise<ServiceResponse<Product>> => {
  const { dataValues } = await ProductModel.create(product);
  return { status: 'CREATED', data: dataValues };
};

export default { postProduct };