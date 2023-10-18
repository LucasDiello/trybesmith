import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ordersMock from '../../mocks/orders.mock';
import OrderModel, { OrderSequelizeModel } from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app';
import { Order } from 'sequelize';

chai.use(chaiHttp);


describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore()});
  it('deve retornar status 200 ao requisitar lista de pedidos', async function () {
      const listAllOrders : any = ordersMock.ordersFull 
 

    const mockOrderModel : OrderSequelizeModel[] = OrderModel.bulkBuild(listAllOrders, {
      include: [
        { model: ProductModel, as: 'productIds', attributes: ['id'] },

      ],
    });

    sinon.stub(OrderModel, 'findAll').resolves(mockOrderModel);

    const response = await chai.request(app).get('/orders');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(ordersMock.orderFullResponse);
    
  });
});
