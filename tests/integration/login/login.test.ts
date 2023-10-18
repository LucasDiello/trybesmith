import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import loginMock from '../../mocks/login.mock';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('ao não passar o campo "username" deve retornar o status 400', async function () {
    const noUsername = loginMock.noUsername;

    const response = await chai.request(app).post('/login').send(noUsername);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: '"username" and "password" are required',
    });
  });

  it('ao não passar o campo "password" deve retornar o status 400', async function () {
    const noPassword = loginMock.noPassword;

    const response = await chai.request(app).post('/login').send(noPassword);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: '"username" and "password" are required',
    });
  });

  it('ao passar um usuário que não existe deve retornar o status 401', async function () {
    const notExistingUserBody = loginMock.notExistingUserBody;

    sinon.stub(UserModel, 'findOne').resolves(null);

    const response = await chai.request(app).post('/login').send(notExistingUserBody);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({
      message: 'Username or password invalid',
    });
  });
  
  it('ao passar um usuário que existe e a senha correta deve retornar o status 200', async function () {
    const validLoginBody = loginMock.validLoginBody;
    
    const response = await chai.request(app).post('/login').send(validLoginBody);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.key('token');
  });
});
