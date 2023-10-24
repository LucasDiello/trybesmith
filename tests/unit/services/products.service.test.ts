import { expect } from 'chai';
import sinon from 'sinon';
import productsMock from '../../mocks/products.mock';
import productsService from '../../../src/services/products.service';
import ProductModel from '../../../src/database/models/product.model';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  it('ao criar um produto com sucesso, deve retornar status CREATED 201', async function () {
    const parameters = productsMock.addProduct;
    const mockCreatedProduct = ProductModel.build(parameters);
    sinon.stub(ProductModel, 'create').resolves(mockCreatedProduct);
    
    const ServiceResponse = await productsService.postProduct(parameters);

    expect(ServiceResponse.status).to.be.equal('CREATED');
    expect(ServiceResponse.data).to.be.deep.equal(ServiceResponse.data);
  });

  it('ao listar os produtos com sucesso, deve retornar status SUCCESSFUL 200', async function () {
    const { products } = productsMock;
    const sequelizeProducts = products.map(product => ProductModel.build(product));

    sinon.stub(ProductModel, 'findAll').resolves(sequelizeProducts);

    const ServiceResponse = await productsService.getAllProducts();

    expect(ServiceResponse.status).to.be.equal('SUCCESSFUL');
    expect(ServiceResponse.data).to.be.deep.equal(ServiceResponse.data);
  });

  it('ao criar um produto sem o campo "name", deve retornar o status BAD_REQUEST 400', async function () {
    const parameters : any = productsMock.productNotName;
    const mockCreatedProduct = ProductModel.build(parameters);
    sinon.stub(ProductModel, 'create').resolves(mockCreatedProduct);

    const ServiceResponse = await productsService.postProduct(parameters);

    expect(ServiceResponse.status).to.be.equal('INVALID_DATA');
    expect(ServiceResponse.data).to.be.deep.equal({
      message: '"name" is required',
    });
  });

  it('ao criar um produto sem o campo "price", deve retornar o status BAD_REQUEST 400', async function () {
    const parameters : any = productsMock.productNotPrice;
    const mockCreatedProduct = ProductModel.build(parameters);
    sinon.stub(ProductModel, 'create').resolves(mockCreatedProduct);

    const ServiceResponse = await productsService.postProduct(parameters);

    expect(ServiceResponse.status).to.be.equal('INVALID_DATA');
    expect(ServiceResponse.data).to.be.deep.equal({
      message: '"price" is required',
    });
  });
  
  it('ao criar um produto com o campo "price" menor que zero, deve retornar o status UNPROCESSABLE_ENTITY 422', async function () {
    const parameters : any = productsMock.productNotLengthName;
    const mockCreatedProduct = ProductModel.build(parameters);
    sinon.stub(ProductModel, 'create').resolves(mockCreatedProduct);

    const ServiceResponse = await productsService.postProduct(parameters);

    expect(ServiceResponse.status).to.be.equal('UNPROCESSABLE_ENTITY');
    expect(ServiceResponse.data).to.be.deep.equal({
      message: "\"name\" length must be at least 3 characters long",
    });
  });

  it('ao criar um produto com o campo "name" menor que 3, deve retornar o status UNPROCESSABLE_ENTITY 422', async function () {
    const parameters : any = productsMock.productNotLengthPrice;
    const mockCreatedProduct = ProductModel.build(parameters);
    sinon.stub(ProductModel, 'create').resolves(mockCreatedProduct);

    const ServiceResponse = await productsService.postProduct(parameters);

    expect(ServiceResponse.status).to.be.equal('UNPROCESSABLE_ENTITY');
    expect(ServiceResponse.data).to.be.deep.equal({
      message: "\"price\" length must be at least 3 characters long",
    });
  });

  it('ao criar um produto com o campo "price" menor que 3, deve retornar o status UNPROCESSABLE_ENTITY 422', async function () {
    const parameters : any = productsMock.productNotLengthPrice;
    const mockCreatedProduct = ProductModel.build(parameters);
    sinon.stub(ProductModel, 'create').resolves(mockCreatedProduct);

    const ServiceResponse = await productsService.postProduct(parameters);

    expect(ServiceResponse.status).to.be.equal('UNPROCESSABLE_ENTITY');
    expect(ServiceResponse.data).to.be.deep.equal({
      message: "\"price\" length must be at least 3 characters long",
    });
  });

  
});
