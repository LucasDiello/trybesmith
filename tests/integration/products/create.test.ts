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
});
