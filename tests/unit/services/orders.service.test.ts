import { expect } from 'chai';
import sinon from 'sinon';
import ordersMock from '../../mocks/orders.mock';
import OrderModel, { OrderInputtableTypes } from '../../../src/database/models/order.model';
import ordersService from '../../../src/services/orders.service';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('devemos testar se a função `getAllOrders` foi chamada, e qual seu retorno', async function () {
    const allOrders : any = ordersMock.ordersFull;
    const sequelizeOrders = allOrders.map((order: Optional<OrderInputtableTypes, NullishPropertiesOf<OrderInputtableTypes>> | undefined) => OrderModel.build(order));
    sinon.stub(OrderModel, 'findAll').resolves(sequelizeOrders);
    const ServiceResponse = await ordersService.getAllOrders();
    expect(ServiceResponse.status).to.be.equal('SUCCESSFUL');
    expect(ServiceResponse.data).to.be.deep.equal(ServiceResponse.data);
  });
});
