import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';
import ProductModel, { ProductInputtableTypes,
  ProductSequelizeModel } from '../database/models/product.model';
import createProductSchema from '../middleware/schema';

const postProduct = async (product: ProductInputtableTypes): Promise<ServiceResponse<Product>> => {
  const { name, price } = product;
  const { error } = createProductSchema.validate({
    name,
    price,
  });

  if (error) {
    const statusVerify = error.message === '"name" is required'
    || error.message === '"price" is required' ? 'INVALID_DATA' : 'UNPROCESSABLE_ENTITY';
    return { status: statusVerify, data: { message: error.message } };
  }

  const { dataValues } = await ProductModel.create(product);
  return { status: 'CREATED', data: dataValues };
};

const getAllProducts = async (): Promise<ServiceResponse<ProductSequelizeModel[]>> => {
  const products = await ProductModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

export default { postProduct, getAllProducts };