import chai from 'chai';
import chaiHttp from 'chai-http';
import * as sinon from 'sinon';
import mongoose from 'mongoose';

import { MotorcycleService } from '../../../services';
import { Motorcycle, MotorcycleResponse, Model } from '../../../interfaces';
import { validMotorcycle } from '../../utils/mocks';
import { errors } from '../../../utils';

chai.use(chaiHttp);

const { expect } = chai;

const throwError = new Error('something went wrong');
const newId = new mongoose.Types.ObjectId();

class MotorcycleModelStub implements Model<MotorcycleResponse> {
  async create(payload: Motorcycle): Promise<MotorcycleResponse> {
    return { ...payload, _id: newId };
  }

  async read(): Promise<MotorcycleResponse[]> {
    return [{ ...validMotorcycle, _id: newId }];
  }

  async readOne(_id: string): Promise<MotorcycleResponse | null> {
    return { ...validMotorcycle, _id: newId };
  }

  async update(_id: string, payload: Motorcycle): Promise<MotorcycleResponse | null> {
    return { ...payload, _id: newId };
  }

  async delete(id: string): Promise<MotorcycleResponse | null> {
    return { ...validMotorcycle, _id: newId };
  }
}

interface FactoriesTypes {
  motorcycleModelStub: MotorcycleModelStub;
  motorcycleService: MotorcycleService;
}

const factories = (): FactoriesTypes => {
  const motorcycleModelStub = new MotorcycleModelStub();
  const motorcycleService = new MotorcycleService(motorcycleModelStub);
  return {
    motorcycleModelStub,
    motorcycleService,
  };
};

describe('MotorcycleService create method', () => {

  it('Should return statusCode 201 and body with a created motorcycle', async () => {
    const { motorcycleService } = factories();

    const httpResponse = await motorcycleService.create(validMotorcycle);
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(201);
    expect(httpResponse.body).to.be.eql({ ...validMotorcycle, _id: newId });
  });

  it('Should return statusCode 400 and body with an error message if has no request body', async () => {
    const invalidBody = {} as any;
    const { motorcycleService } = factories();

    const httpResponse = await motorcycleService.create(invalidBody);
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(400);
    expect(httpResponse).to.be.eql(errors.invalidBodyResponse);
  });

  it('Should return statusCode 400 and body with an error message if has missing any key in request body', async () => {
    const { model: _model, ...rest } = validMotorcycle;
    const invalidBody = { ...rest } as any;
    const { motorcycleService } = factories();

    const httpResponse = await motorcycleService.create(invalidBody);
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(400);
    expect(httpResponse).to.be.eql({ statusCode: 400, body: { error: 'Model is required' } });
  });

  it('Should return statusCode 400 and body with an error message if has a invalid key in request body', async () => {
    const { model: _model, ...rest } = validMotorcycle;
    const invalidBody = { ...rest, model: 123 } as any;
    const { motorcycleService } = factories();

    const httpResponse = await motorcycleService.create(invalidBody);
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(400);
    expect(httpResponse).to.be.eql({ statusCode: 400, body: { error: 'Model must be a string' } });
  });

});

describe('MotorcycleService read method', () => {

  it('Should return statusCode 200 and body with all motorcycles', async () => {
    const { motorcycleService } = factories();

    const httpResponse = await motorcycleService.read();
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(200);
    expect(httpResponse.body).to.be.eql([{ ...validMotorcycle, _id: newId }]);
  });

});

describe('MotorcycleService readOne method', () => {

  it('Should return statusCode 400 and body with an error message if has a invalid id request parameter', async () => {
    const invalidId = null as any;
    const { motorcycleService } = factories();

    const httpResponse = await motorcycleService.readOne(invalidId);
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(400);
    expect(httpResponse).to.be.eql({ statusCode: 400, body: { error: 'Id must be a string' } });
  });

  it('Should return statusCode 404 and body with an error message if has no motorcycle with this id', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { motorcycleService, motorcycleModelStub } = factories();

    sinon.stub(motorcycleModelStub, 'readOne').resolves(null);

    const httpResponse = await motorcycleService.readOne(validId);
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(404);
    expect(httpResponse).to.be.eql(errors.notFoundResponse);
  });

  it('Should return statusCode 200 and body with a motorcycle', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { motorcycleService } = factories();

    const httpResponse = await motorcycleService.readOne(validId);
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(200);
    expect(httpResponse.body).to.be.eql({ ...validMotorcycle, _id: newId });
  });

});

describe('MotorcycleService delete method', () => {

  it('Should return statusCode 400 and body with an error message if has a invalid id request parameter', async () => {
    const invalidId = null as any;
    const { motorcycleService } = factories();

    const httpResponse = await motorcycleService.delete(invalidId);
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(400);
    expect(httpResponse).to.be.eql({ statusCode: 400, body: { error: 'Id must be a string' } });
  });

  it('Should return statusCode 404 and body with an error message if has no motorcycle with this id', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { motorcycleService, motorcycleModelStub } = factories();

    sinon.stub(motorcycleModelStub, 'delete').resolves(null);

    const httpResponse = await motorcycleService.delete(validId);
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(404);
    expect(httpResponse).to.be.eql(errors.notFoundResponse);
  });

  it('Should return statusCode 200 and body with a motorcycle', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { motorcycleService } = factories();

    const httpResponse = await motorcycleService.delete(validId);
    
    expect(httpResponse).to.have.property('statusCode');
    expect(httpResponse).to.have.property('body');
    expect(httpResponse.statusCode).to.be.eql(204);
    expect(httpResponse.body).to.be.eql({ ...validMotorcycle, _id: newId });
  });

});
