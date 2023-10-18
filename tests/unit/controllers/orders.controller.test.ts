import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ordersMock from '../../mocks/orders.mock';
import ordersController from '../../../src/controller/orders.controller';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('ao listar os pedidos com sucesso, deve retornar status SUCCESSFUL 200', async function () {
      req.body = ordersMock.orderFullResponse;

      const serviceResponse = {
        status: 'SUCCESSFUL',
        data: req.body
      };

      res.status(200).json(serviceResponse.data);

      await ordersController.getAllOrders(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });

});
