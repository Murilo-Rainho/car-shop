import chai from 'chai';
import chaiHttp from 'chai-http';
import * as sinon from 'sinon';
import mongoose from 'mongoose';

import { Motorcycle } from '../../../interfaces';
import { validMotorcycle } from '../../utils/mocks';
import { MotorcycleModel, motorcycleSchema } from '../../../models';

chai.use(chaiHttp);

const { expect } = chai;

const throwError = new Error('something went wrong');
const newId = new mongoose.Types.ObjectId();

interface FactoriesTypes {
  mongooseModel: mongoose.Model<Motorcycle>;
  motorcycleModel: MotorcycleModel;
}

const factories = (): FactoriesTypes => {
  const mongooseModel = mongoose.model('Motorcycles', motorcycleSchema);
  const motorcycleModel = new MotorcycleModel(mongooseModel);
  return {
    mongooseModel,
    motorcycleModel,
  };
};

describe('MotorcycleModel create method', () => {

  it('Should return a created car if all goes well', async () => {
    const { motorcycleModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'create').resolves({ ...validMotorcycle, _id: newId });

    const createdMotorcycle = await motorcycleModel.create(validMotorcycle);
    
    expect(createdMotorcycle).to.have.property('model');
    expect(createdMotorcycle).to.have.property('year');
    expect(createdMotorcycle).to.have.property('color');
    expect(createdMotorcycle).to.have.property('buyValue');
    expect(createdMotorcycle).to.have.property('category');
    expect(createdMotorcycle).to.have.property('engineCapacity');
    expect(createdMotorcycle).to.have.property('_id');

    (mongooseModel.create as any).restore();
  });

});

describe('MotorcycleModel read method', () => {

  it('Should return all motorcycles if all goes well', async () => {
    const { motorcycleModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'find').resolves([{ ...validMotorcycle, _id: newId }] as any[]);

    const [motorcycle] = await motorcycleModel.read();
    
    expect(motorcycle).to.have.property('model');
    expect(motorcycle).to.have.property('year');
    expect(motorcycle).to.have.property('color');
    expect(motorcycle).to.have.property('buyValue');
    expect(motorcycle).to.have.property('category');
    expect(motorcycle).to.have.property('engineCapacity');
    expect(motorcycle).to.have.property('_id');

    (mongooseModel.find as any).restore();
  });

});

describe('MotorcycleModel readOne method', () => {

  it('Should return the motorcycle if all goes well', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { motorcycleModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'findById').resolves({ ...validMotorcycle, _id: newId } as any);

    const car = await motorcycleModel.readOne(validId);
    
    expect(car).to.have.property('model');
    expect(car).to.have.property('year');
    expect(car).to.have.property('color');
    expect(car).to.have.property('buyValue');
    expect(car).to.have.property('category');
    expect(car).to.have.property('engineCapacity');
    expect(car).to.have.property('_id');

    (mongooseModel.findById as any).restore();
  });

  it('Should return the null if has no motorcycle with this id', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { motorcycleModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'findById').resolves(null);

    const motorcycleNotFound = await motorcycleModel.readOne(validId);
    
    expect(motorcycleNotFound).to.be.null;

    (mongooseModel.findById as any).restore();
  });

});

describe('MotorcycleMode delete method', () => {

  it('Should return the motorcycle if all goes well', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { motorcycleModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'findByIdAndDelete').resolves({ ...validMotorcycle, _id: newId } as any);

    const motorcycle = await motorcycleModel.delete(validId);
    
    expect(motorcycle).to.have.property('model');
    expect(motorcycle).to.have.property('year');
    expect(motorcycle).to.have.property('color');
    expect(motorcycle).to.have.property('buyValue');
    expect(motorcycle).to.have.property('category');
    expect(motorcycle).to.have.property('engineCapacity');
    expect(motorcycle).to.have.property('_id');

    (mongooseModel.findByIdAndDelete as any).restore();
  });

  it('Should return the null if has no motorcycle with this id', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { motorcycleModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'findByIdAndDelete').resolves(null);

    const motorcycleNotFound = await motorcycleModel.delete(validId);
    
    expect(motorcycleNotFound).to.be.null;

    (mongooseModel.findByIdAndDelete as any).restore();
  });

});

describe('MotorcycleModel update method', () => {

  it('Should return the motorcycle if all goes well', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { motorcycleModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'findByIdAndUpdate').resolves({ ...validMotorcycle, _id: newId } as any);

    const motorcycle = await motorcycleModel.update(validId, validMotorcycle);
    
    expect(motorcycle).to.have.property('model');
    expect(motorcycle).to.have.property('year');
    expect(motorcycle).to.have.property('color');
    expect(motorcycle).to.have.property('buyValue');
    expect(motorcycle).to.have.property('category');
    expect(motorcycle).to.have.property('engineCapacity');
    expect(motorcycle).to.have.property('_id');

    (mongooseModel.findByIdAndUpdate as any).restore();
  });

  it('Should return the null if has no motorcycle with this id', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { motorcycleModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'findByIdAndUpdate').resolves(null);

    const motorcycleNotFound = await motorcycleModel.update(validId, validMotorcycle);
    
    expect(motorcycleNotFound).to.be.null;

    (mongooseModel.findByIdAndUpdate as any).restore();
  });

});
