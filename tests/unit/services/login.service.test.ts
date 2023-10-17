import { expect } from 'chai';
import sinon from 'sinon';
import productsMock from '../../mocks/products.mock';
import productsService from '../../../src/services/products.service';
import ProductModel from '../../../src/database/models/product.model';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  it('ao criar um produto com sucesso, deve retornar status CREATED 201', async function () {
    const parameters = productsMock.addProduct;
    const mockCreatedProduct = ProductModel.build(parameters);
    sinon.stub(ProductModel, 'create').resolves(mockCreatedProduct);
    
    const ServiceResponse = await productsService.postProduct(parameters);

    expect(ServiceResponse.status).to.be.equal('CREATED');
    expect(ServiceResponse.data).to.be.deep.equal(ServiceResponse.data);
  });
});
