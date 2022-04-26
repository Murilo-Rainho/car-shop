import chai from 'chai';
import chaiHttp from 'chai-http';
import * as sinon from 'sinon';
import mongoose from 'mongoose';

import { CarService } from '../../../services';
import { Car, CarResponse, Model } from '../../../interfaces';
import { validCar } from '../../utils/mocks';
import { errors } from '../../../utils';

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

  it('Should return statusCode 400 and body with a error message if has no request body', async () => {
    const invalidBody = {} as any;
    const { carService } = factories();

    const httpResponse = await carService.create(invalidBody);
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(400);
    expect(httpResponse).to.be.eql(errors.invalidBodyResponse);
  });

  it('Should return statusCode 400 and body with a error message if has missing any key in request body', async () => {
    const { model: _model, ...rest } = validCar;
    const invalidBody = { ...rest } as any;
    const { carService } = factories();

    const httpResponse = await carService.create(invalidBody);
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(400);
    expect(httpResponse).to.be.eql({ statusCode: 400, body: { error: 'Model is required' } });
  });

  it('Should return statusCode 400 and body with a error message if has a invalid key in request body', async () => {
    const { model: _model, ...rest } = validCar;
    const invalidBody = { ...rest, model: 123 } as any;
    const { carService } = factories();

    const httpResponse = await carService.create(invalidBody);
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(400);
    expect(httpResponse).to.be.eql({ statusCode: 400, body: { error: 'Model must be a string' } });
  });

});
