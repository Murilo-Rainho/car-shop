import chai from 'chai';
import chaiHttp from 'chai-http';
import * as sinon from 'sinon';
import mongoose from 'mongoose';

import { MotorcycleController } from '../../../controllers';
import { Motorcycle, MotorcycleResponse, ErrorResponse, HttpResponse, Service } from '../../../interfaces';
import { validMotorcycle } from '../../utils/mocks';
import { NextFunction, Request, Response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

const throwError = new Error('something went wrong');
const newId = new mongoose.Types.ObjectId();

class MotorcycleServiceStub implements Service<Motorcycle, MotorcycleResponse> {
  async create(_body: Motorcycle): Promise<HttpResponse<MotorcycleResponse | ErrorResponse>> {
    return { statusCode: 201, body: { ...validMotorcycle, _id: newId } };
  }

  async read(): Promise<HttpResponse<MotorcycleResponse[]>> {
    return { statusCode: 200, body: [{ ...validMotorcycle, _id: newId }] };
  }

  async readOne(_id: string): Promise<HttpResponse<MotorcycleResponse | ErrorResponse>> {
    return { statusCode: 200, body: { ...validMotorcycle, _id: newId } };
  }

  async update(body: Motorcycle, _id: string): Promise<HttpResponse<MotorcycleResponse | ErrorResponse>> {
    return { statusCode: 200, body: { ...body, _id: newId } };
  }

  async delete(_id: string): Promise<HttpResponse<MotorcycleResponse | ErrorResponse>> {
    return { statusCode: 200, body: { ...validMotorcycle, _id: newId } };
  }
}

interface FactoriesTypes {
  motorcycleServiceStub: MotorcycleServiceStub;
  motorcycleController: MotorcycleController;
}

const factories = (): FactoriesTypes => {
  const motorcycleServiceStub = new MotorcycleServiceStub();
  const motorcycleController = new MotorcycleController(motorcycleServiceStub);
  return {
    motorcycleServiceStub,
    motorcycleController,
  };
};

describe('MotorcycleController create method', () => {

  const mockReq = {} as Request;
  const mockRes = {} as Response;
  let mockNext: NextFunction = () => {};

  beforeEach(() => {
    mockRes.status = sinon.stub().returns(mockRes);
    mockRes.json = sinon.stub().returns({});
    mockNext = sinon.stub().returns({});
  });

  it('Should return statusCode 201 and created car', async () => {
    mockReq.body = validMotorcycle;
    const { motorcycleController } = factories();

    await motorcycleController.create(mockReq, mockRes, mockNext);
    expect((mockRes.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((mockRes.json as sinon.SinonStub).calledWith({ ...validMotorcycle, _id: newId })).to.be.true;
  });

  it('Should call next error middleware if CarService create method throws', async () => {
    mockReq.body = validMotorcycle;
    const { motorcycleController, motorcycleServiceStub } = factories();

    sinon.stub(motorcycleServiceStub, 'create').rejects(throwError);

    await motorcycleController.create(mockReq, mockRes, mockNext);
    expect((mockNext as sinon.SinonStub).calledWith(throwError)).to.be.true;
  });

});

describe('MotorcycleController read method', () => {

  const mockReq = {} as Request;
  const mockRes = {} as Response;
  let mockNext: NextFunction = () => {};

  beforeEach(() => {
    mockRes.status = sinon.stub().returns(mockRes);
    mockRes.json = sinon.stub().returns({});
    mockNext = sinon.stub().returns({});
  });

  it('Should return statusCode 200 and all created cars', async () => {
    const { motorcycleController } = factories();

    await motorcycleController.read(mockReq, mockRes, mockNext);
    expect((mockRes.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((mockRes.json as sinon.SinonStub).calledWith([{ ...validMotorcycle, _id: newId }])).to.be.true;
  });

});
