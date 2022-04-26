import chai from 'chai';
import chaiHttp from 'chai-http';
import * as sinon from 'sinon';
import mongoose from 'mongoose';

import { CarService } from '../../../services';
import { Car, CarResponse, ErrorResponse, HttpResponse, Model } from '../../../interfaces';
import { validCar } from '../../utils/mocks';
import { NextFunction, Request, Response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

const throwError = new Error('something went wrong');
const newId = new mongoose.Types.ObjectId();

class CarModelStub implements Model<Car, CarResponse> {
  async create(payload: Car): Promise<CarResponse> {
    return { ...payload, _id: newId };
  }

  async read(): Promise<CarResponse[]> {
    return [{ ...validCar, _id: newId }];
  }

  async readOne(_id: string): Promise<CarResponse | null> {
    return { ...validCar, _id: newId };
  }

  async update(_id: string, payload: Car): Promise<CarResponse | null> {
    return { ...payload, _id: newId };
  }

  async delete(id: string): Promise<CarResponse | null> {
    return { ...validCar, _id: newId };
  }
}

interface FactoriesTypes {
  carModelStub: CarModelStub;
  carService: CarService;
}

const factories = (): FactoriesTypes => {
  const carModelStub = new CarModelStub();
  const carService = new CarService(carModelStub);
  return {
    carModelStub,
    carService,
  };
};

describe('CarService create method', () => {

  it('Should return statusCode 201 and body with a created car', async () => {
    const { carService } = factories();

    const httpResponse = await carService.create(validCar);
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(201);
    expect(httpResponse.body).to.be.eql({ ...validCar, _id: newId });
  });

});