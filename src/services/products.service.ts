import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';
import ProductModel, { ProductInputtableTypes,
  ProductSequelizeModel } from '../database/models/product.model';

const postProduct = async (product: ProductInputtableTypes): Promise<ServiceResponse<Product>> => {
  const { dataValues } = await ProductModel.create(product);
  return { status: 'CREATED', data: dataValues };
};

const getAllProducts = async (): Promise<ServiceResponse<ProductSequelizeModel[]>> => {
  const products = await ProductModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

export default { postProduct, getAllProducts };