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

const throwError = new Error('something went wrong');
const newId = new mongoose.Types.ObjectId();

class CarServiceStub implements Service<Car, CarResponse> {
  async create(_body: Car): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    return { statusCode: 201, body: { ...validCar, _id: newId } };
  }

  async read(): Promise<HttpResponse<CarResponse[]>> {
    return { statusCode: 200, body: [{ ...validCar, _id: newId }] };
  }

  async readOne(_id: string): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    return { statusCode: 200, body: { ...validCar, _id: newId } };
  }

  async update(body: Car, _id: string): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    return { statusCode: 200, body: { ...body, _id: newId } };
  }

  async delete(_id: string): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    return { statusCode: 200, body: { ...validCar, _id: newId } };
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
    expect((mockRes.json as sinon.SinonStub).calledWith({ ...validCar, _id: newId })).to.be.true;
  });

  it('Should call next error middleware if CarService create method throws', async () => {
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
    expect((mockRes.json as sinon.SinonStub).calledWith([{ ...validCar, _id: newId }])).to.be.true;
  });

  it('Should call next error middleware if CarService read method throws', async () => {
    const { carController, carServiceStub } = factories();

    sinon.stub(carServiceStub, 'read').rejects(throwError);

    await carController.read(mockReq, mockRes, mockNext);
    expect((mockNext as sinon.SinonStub).calledWith(throwError)).to.be.true;
  });

});

describe('CarController readOne method', () => {

  const mockReq = {} as Request;
  const mockRes = {} as Response;
  let mockNext: NextFunction = () => {};

  beforeEach(() => {
    mockRes.status = sinon.stub().returns(mockRes);
    mockRes.json = sinon.stub().returns({});
    mockNext = sinon.stub().returns({});
  });

  it('Should return statusCode 200 and the car', async () => {
    mockReq.params = { id: '1' };
    const { carController } = factories();

    await carController.readOne(mockReq, mockRes, mockNext);
    expect((mockRes.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((mockRes.json as sinon.SinonStub).calledWith({ ...validCar, _id: newId })).to.be.true;
  });

  it('Should call next error middleware if CarService readOne method throws', async () => {
    mockReq.params = { id: '1' };
    const { carController, carServiceStub } = factories();

    sinon.stub(carServiceStub, 'readOne').rejects(throwError);

    await carController.readOne(mockReq, mockRes, mockNext);
    expect((mockNext as sinon.SinonStub).calledWith(throwError)).to.be.true;
  });

});

describe('CarController delete method', () => {

  const mockReq = {} as Request;
  const mockRes = {} as Response;
  let mockNext: NextFunction = () => {};

  beforeEach(() => {
    mockRes.status = sinon.stub().returns(mockRes);
    mockRes.json = sinon.stub().returns({});
    mockNext = sinon.stub().returns({});
  });

  it('Should return statusCode 200 and the deleted car', async () => {
    mockReq.params = { id: '1' };
    const { carController } = factories();

    await carController.delete(mockReq, mockRes, mockNext);
    expect((mockRes.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((mockRes.json as sinon.SinonStub).calledWith({ ...validCar, _id: newId })).to.be.true;
  });

  it('Should call next error middleware if CarService delete method throws', async () => {
    mockReq.params = { id: '1' };
    const { carController, carServiceStub } = factories();

    sinon.stub(carServiceStub, 'delete').rejects(throwError);

    await carController.delete(mockReq, mockRes, mockNext);
    expect((mockNext as sinon.SinonStub).calledWith(throwError)).to.be.true;
  });

});

describe('CarController update method', () => {

  const mockReq = {} as Request;
  const mockRes = {} as Response;
  let mockNext: NextFunction = () => {};

  beforeEach(() => {
    mockRes.status = sinon.stub().returns(mockRes);
    mockRes.json = sinon.stub().returns({});
    mockNext = sinon.stub().returns({});
  });

  it('Should return statusCode 200 and the updated car', async () => {
    mockReq.body = validCar;
    mockReq.params = { id: '1' };
    const { carController } = factories();

    await carController.update(mockReq, mockRes, mockNext);
    expect((mockRes.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((mockRes.json as sinon.SinonStub).calledWith({ ...mockReq.body, _id: newId })).to.be.true;
  });

  it('Should call next error middleware if CarService update method throws', async () => {
    mockReq.body = validCar;
    mockReq.params = { id: '1' };
    const { carController, carServiceStub } = factories();

    sinon.stub(carServiceStub, 'update').rejects(throwError);

    await carController.update(mockReq, mockRes, mockNext);
    expect((mockNext as sinon.SinonStub).calledWith(throwError)).to.be.true;
  });

});
