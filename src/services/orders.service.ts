import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { Order } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

const getAllOrders = async (): Promise<ServiceResponse<Order[]>> => {
  const orders = await OrderModel.findAll({
    include: { model: ProductModel, as: 'productIds', attributes: ['id'] },
  });
  const adjustedOrders = orders.map((order) => order.toJSON()).map((order) => ({
    id: order.id,
    userId: order.userId,
    productIds: order.productIds?.map((product) => product.id),
  }));

  return { status: 'SUCCESSFUL', data: adjustedOrders as Order[] };
};

export default { getAllOrders };
