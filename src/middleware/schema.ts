import Joi, { ObjectSchema } from 'joi';
import { ProductSchema } from '../types/Product';

const createProductSchema: ObjectSchema<ProductSchema> = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': '"name" must be a string',
    'any.required': '"name" is required',
    'string.min': '"name" length must be at least 3 characters long',
  }),
  price: Joi.string().min(3).required().messages({
    'any.required': '"price" is required',
    'string.base': '"price" must be a string',
    'string.min': '"price" length must be at least 3 characters long',
  }),
});

export default createProductSchema;
