import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginMock from '../../mocks/login.mock';
import loginService from '../../../src/services/login.service';
import loginController from '../../../src/controller/login.controller';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Token } from '../../../src/types/Token';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('ao não passar o campo "username" deve retornar o status 400', async function () {
    req.body = loginMock.noUsername;

    const serviceResponse : ServiceResponse<Token>  = {
      status: 'INVALID_DATA',
      data: {message: '"username" and "password" are required'},
    }

    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);

    await loginController.verifyLogin(req, res);

    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({
      message: '"username" and "password" are required',
    });

    it('ao não passar o campo "password" deve retornar o status 400', async function () {
      req.body = loginMock.noPassword;

      const serviceResponse : ServiceResponse<Token>  = {
        status: 'INVALID_DATA',
        data: {message: '"username" and "password" are required'},
      }

      sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);

      await loginController.verifyLogin(req, res);

      expect(res.status).to.be.calledWith(400);
      expect(res.json).to.be.calledWith({
        message: '"username" and "password" are required',
      });
    });

    it('ao passar um usuário que não existe deve retornar o status 401', async function () {
      req.body = loginMock.notExistingUserBody;

      const serviceResponse : ServiceResponse<Token>  = {
        status: 'UNAUTHORIZED',
        data: {message: 'Username or password invalid'},
      }

      sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);

      await loginController.verifyLogin(req, res);

      expect(res.status).to.be.calledWith(401);
      expect(res.json).to.be.calledWith({
        message: 'Username or password invalid',
      });

    });

    it('ao passar um usuário que existe e a senha correta deve retornar o status 200', async function () {
        req.body = loginMock.existingUser;

        const token = { token: 'm1nh4t0k3nbcr1p7v4l1d4' }

        const serviceResponse : ServiceResponse<Token>  = {
          status: 'SUCCESSFUL',
          data: token ,
        };

      sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);

      await loginController.verifyLogin(req, res);

      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.have.been.calledWith(token);

  });


})
})