import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import productsMock from '../../mocks/products.mock';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('ao criar um produto com sucesso, deve retornar status 201', async function () {
    
    const { addProduct } = productsMock
    const mockCreatedProduct = ProductModel.build(addProduct);
    sinon.stub(ProductModel, 'create').resolves(mockCreatedProduct)

    const response = await chai.request(app).post('/products').send(addProduct);
    
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal({ id: response.body.id, ...addProduct });
  });

  it('ao criar um produto sem o campo "name", deve retornar o status 400', async function () {
    const { productNotName } : any = productsMock;
     
    const mockCreatedProduct = ProductModel.build(productNotName);
    sinon.stub(ProductModel, 'create').resolves(mockCreatedProduct)

    
    const response = await chai.request(app).post('/products').send(productNotName);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: '"name" is required',
    });
  });

  it('ao criar um produto sem o campo "price", deve retornar o status 400', async function () {
    const { productNotPrice } : any = productsMock;
    const mockCreatedProduct = ProductModel.build(productNotPrice);
    sinon.stub(ProductModel, 'create').resolves(mockCreatedProduct)
    const response = await chai.request(app).post('/products').send(productNotPrice);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: '"price" is required',
    });
  });

  it('ao criar um produto com o campo "price" menor que zero, deve retornar o status 422', async function () {
    const { productNotLengthName } : any = productsMock;
    const mockCreatedProduct = ProductModel.build(productNotLengthName);
    sinon.stub(ProductModel, 'create').resolves(mockCreatedProduct)
    const response = await chai.request(app).post('/products').send(productNotLengthName);

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({
      message: "\"name\" length must be at least 3 characters long",
    });
  });

  it('ao criar um produto com o campo "name" menor que 3, deve retornar o status 422', async function () {
    const { productNotLengthPrice } : any = productsMock;
    const mockCreatedProduct = ProductModel.build(productNotLengthPrice);
    sinon.stub(ProductModel, 'create').resolves(mockCreatedProduct)
    const response = await chai.request(app).post('/products').send(productNotLengthPrice);

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({
      message: "\"price\" length must be at least 3 characters long",
    });
  });

  it('ao criar um produto com o campo "price" menor que 3, deve retornar o status 422', async function () { 
    const { productNotPrice } : any = productsMock;
    const mockCreatedProduct = ProductModel.build(productNotPrice);
    sinon.stub(ProductModel, 'create').resolves(mockCreatedProduct)
    const response = await chai.request(app).post('/products').send(productNotPrice);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: '"price" is required',
    });
  });
});
