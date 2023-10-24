import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productsController from '../../../src/controller/products.controller';
import productsMock from '../../mocks/products.mock';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { ProductInputtableTypes, ProductSequelizeModel } from '../../../src/database/models/product.model';
import { Product } from '../../../src/types/Product';
import productsService from '../../../src/services/products.service';

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

    const serviceResponse: ServiceResponse<Product> = {
      status: 'CREATED',
      data: { ...req.body }
    };

    sinon.stub(productsService, 'postProduct').resolves(serviceResponse)


    await productsController.postProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });

  it('ao listar os produtos com sucesso, deve retornar status SUCCESSFUL 200', async function () {
    const { products } = productsMock;


    const serviceResponse : any = {
      status: 'SUCCESSFUL',
      data: products
    };

    sinon.stub(productsService, 'getAllProducts').resolves(serviceResponse);

    await productsController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });

  it('ao criar um produto sem o campo "name", deve retornar um erro', async function () {
    const { productNotName } = productsMock;

    req.body = productNotName;

    const serviceResponse: ServiceResponse<Product> = {
      status: 'INVALID_DATA',
      data: {
        message: '"name" is required',
      }
    };

    sinon.stub(productsService, 'postProduct').resolves(serviceResponse);

    await productsController.postProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);

    sinon

  });

  it('ao criar um produto sem o campo "price", deve retornar um erro', async function () {
    const { productNotPrice } = productsMock;

    req.body = productNotPrice;

    const serviceResponse: ServiceResponse<Product> = {
      status: 'INVALID_DATA',
      data: {
        message: '"price" is required',
      }
    };

    sinon.stub(productsService, 'postProduct').resolves(serviceResponse);

    await productsController.postProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });

  it('ao criar um produto com o campo "price" menor que zero, deve retornar um erro', async function () {
    const { productNotLengthName } = productsMock;

    req.body = productNotLengthName;

    const serviceResponse: ServiceResponse<Product> = {
      status: 'UNPROCESSABLE_ENTITY',
      data: {
        message: "\"name\" length must be at least 3 characters long",
      }
    };

    sinon.stub(productsService, 'postProduct').resolves(serviceResponse);

    await productsController.postProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });

  it('ao criar um produto com o campo "name" menor que 3, deve retornar um erro', async function () {
    const { productNotLengthPrice } = productsMock;

    req.body = productNotLengthPrice;

    const serviceResponse: ServiceResponse<Product> = {
      status: 'UNPROCESSABLE_ENTITY',
      data: {
        message: "\"price\" length must be at least 3 characters long",
      }
    };

    sinon.stub(productsService, 'postProduct').resolves(serviceResponse);

    await productsController.postProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });

  it('ao criar um produto com o campo "price" menor que 3, deve retornar um erro', async function () {
    const { productNotLengthPrice } = productsMock;

    req.body = productNotLengthPrice;

    const serviceResponse: ServiceResponse<Product> = {
      status: 'UNPROCESSABLE_ENTITY',
      data: {
        message: "\"price\" length must be at least 3 characters long",
      }
    };

    sinon.stub(productsService, 'postProduct').resolves(serviceResponse);

    await productsController.postProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });
});

