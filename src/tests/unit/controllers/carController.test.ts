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

describe('CarController create method', () => {

  const mockReq = {} as Request;
  const mockRes = {} as Response;
  const mockNext: NextFunction = () => {};

  beforeEach(() => {
    mockRes.status = sinon.stub().returns(mockRes);
    mockRes.json = sinon.stub().returns({});
  });

  it('Should return statusCode 201 and a valid body', async () => {
    mockReq.body = validCar;
    const { carController } = factories();

    await carController.create(mockReq, mockRes, mockNext);
    expect((mockRes.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((mockRes.json as sinon.SinonStub).calledWith(validCar)).to.be.true;
  });

});
