import chai from 'chai';
import chaiHttp from 'chai-http';
import * as sinon from 'sinon';
import mongoose from 'mongoose';

import { CarController } from '../../../controllers';
import { Car, CarResponse, ErrorResponse, HttpResponse, Service } from '../../../interfaces';
import { validCar } from '../../utils/mocks';
import { NextFunction, Request, Response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

class CarServiceStub implements Service<Car, CarResponse> {
  async create(body: Car): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    return { statusCode: 201, body: validCar };
  }

  async read(): Promise<HttpResponse<CarResponse[]>> {
    return { statusCode: 200, body: [validCar] };
  }

  async readOne(id: string): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    return { statusCode: 200, body: validCar };
  }

  async update(body: Car, id: string): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    return { statusCode: 200, body: { ...body, _id: new mongoose.Types.ObjectId() } };
  }

  async delete(id: string): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    return { statusCode: 200, body: validCar };
  }
}

interface FactoriesTypes {
  carServiceStub: CarServiceStub;
  carController: CarController;
}

const factories = (): FactoriesTypes => {
  const carServiceStub = new CarServiceStub();
  const carController = new CarController(carServiceStub);
  return {
    carServiceStub,
    carController,
  };
};

const throwError = new Error('something went wrong');

describe('CarController create method', () => {

  const mockReq = {} as Request;
  const mockRes = {} as Response;
  let mockNext: NextFunction = () => {};

  beforeEach(() => {
    mockRes.status = sinon.stub().returns(mockRes);
    mockRes.json = sinon.stub().returns({});
    mockNext = sinon.stub().returns({});
  });

  it('Should return statusCode 201 and created car', async () => {
    mockReq.body = validCar;
    const { carController } = factories();

    await carController.create(mockReq, mockRes, mockNext);
    expect((mockRes.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((mockRes.json as sinon.SinonStub).calledWith(validCar)).to.be.true;
  });

  it('Should call next error middleware if CarService throws', async () => {
    mockReq.body = validCar;
    const { carController, carServiceStub } = factories();

    sinon.stub(carServiceStub, 'create').rejects(throwError);

    await carController.create(mockReq, mockRes, mockNext);
    expect((mockNext as sinon.SinonStub).calledWith(throwError)).to.be.true;
  });

});

describe('CarController read method', () => {

  const mockReq = {} as Request;
  const mockRes = {} as Response;
  let mockNext: NextFunction = () => {};

  beforeEach(() => {
    mockRes.status = sinon.stub().returns(mockRes);
    mockRes.json = sinon.stub().returns({});
    mockNext = sinon.stub().returns({});
  });

  it('Should return statusCode 200 and all created cars', async () => {
    const { carController } = factories();

    await carController.read(mockReq, mockRes, mockNext);
    expect((mockRes.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((mockRes.json as sinon.SinonStub).calledWith([validCar])).to.be.true;
  });

});
