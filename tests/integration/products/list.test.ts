import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productsMock from '../../mocks/products.mock';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('deve retornar status OK 200', async function () {
    const { products } = productsMock;
    const sequelizeProducts = products.map(product => ProductModel.build(product));

    sinon.stub(ProductModel, 'findAll').resolves(sequelizeProducts);

    const response = await chai.request(app).get('/products');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(products);

  });
});
