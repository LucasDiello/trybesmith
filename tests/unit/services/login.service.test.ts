import { expect } from 'chai';
import sinon from 'sinon';
import loginMock from '../../mocks/login.mock';
import loginService from '../../../src/services/login.service';
import UserModel from '../../../src/database/models/user.model';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  it('ao não passar o campo "username" deve retornar o status 400', async function () {
    const parameters = loginMock.noUsername;

    const serviceResponse = await loginService.verifyLogin(parameters);

    expect(serviceResponse.status).to.be.equal('INVALID_DATA');
    expect(serviceResponse.data).to.be.deep.equal({
      message: '"username" and "password" are required',
    });
  });

  it('ao não passar o campo "password" deve retornar o status 400', async function () {
    const parameters = loginMock.noPassword;

    const serviceResponse = await loginService.verifyLogin(parameters);

    expect(serviceResponse.status).to.be.equal('INVALID_DATA');
    expect(serviceResponse.data).to.be.deep.equal({
      message: '"username" and "password" are required',
    });
  });

  it('ao passar um usuário que não existe deve retornar o status 401', async function () {
    const parameters = loginMock.notExistingUserBody;
    sinon.stub(UserModel, 'findOne').resolves(null);

    const serviceResponse = await loginService.verifyLogin(parameters);

    expect(serviceResponse.status).to.be.equal('UNAUTHORIZED');
    expect(serviceResponse.data).to.be.deep.equal({
      message: 'Username or password invalid',
    });
  });

  it('ao passar um usuário que existe mas com a senha errada deve retornar o status 401', async function () {
    const parameters = loginMock.existingUserWithWrongPasswordBody;
    const mockFindOneReturn = UserModel.build(loginMock.existingUser);

    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

    const serviceResponse = await loginService.verifyLogin(parameters);

    expect(serviceResponse.status).to.be.equal('UNAUTHORIZED');
    expect(serviceResponse.data).to.be.deep.equal({
      message: 'Username or password invalid',
    });

  });

  it('ao passar um usuário que existe e a senha correta deve retornar o status 200', async function () {
    const parameters = loginMock.validLoginBody;

    const serviceResponse = await loginService.verifyLogin(parameters);

    expect(serviceResponse.status).to.eq('SUCCESSFUL');
    expect(serviceResponse.data).to.have.key('token');

  });
});
