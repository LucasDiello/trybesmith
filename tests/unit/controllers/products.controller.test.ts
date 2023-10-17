import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productsController from '../../../src/controller/products.controller';
import productsMock from '../../mocks/products.mock';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { ProductInputtableTypes } from '../../../src/database/models/product.model';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('ao criar um produto com sucesso, deve retornar status CREATED 201', async function () {
    req.body = productsMock.addProduct;

    const serviceResponse: ServiceResponse<ProductInputtableTypes> = {
      status: 'CREATED',
      data: { ...req.body }
    };

    res.status(201).json(serviceResponse.data);

    await productsController.postProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });
});

