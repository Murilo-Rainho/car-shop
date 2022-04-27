import chai from 'chai';
import chaiHttp from 'chai-http';
import * as sinon from 'sinon';
import mongoose, { Model } from 'mongoose';

import { Car, CarResponse } from '../../../interfaces';
import { validCar } from '../../utils/mocks';
import { errors } from '../../../utils';
import { CarModel, CarSchema } from '../../../models';

chai.use(chaiHttp);

const { expect } = chai;

const throwError = new Error('something went wrong');
const newId = new mongoose.Types.ObjectId();

interface FactoriesTypes {
  mongooseModel: mongoose.Model<Car>;
  carModel: CarModel;
}

const factories = (): FactoriesTypes => {
  const mongooseModel = mongoose.model('Cars', CarSchema);
  const carModel = new CarModel(mongooseModel);
  return {
    mongooseModel,
    carModel,
  };
};

describe('CarModel create method', () => {

  it('Should return a created car if all goes well', async () => {
    const { carModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'create').resolves({ ...validCar, _id: newId });

    const createdCar = await carModel.create(validCar);
    
    expect(createdCar).to.have.property('model');
    expect(createdCar).to.have.property('year');
    expect(createdCar).to.have.property('color');
    expect(createdCar).to.have.property('buyValue');
    expect(createdCar).to.have.property('seatsQty');
    expect(createdCar).to.have.property('doorsQty');
    expect(createdCar).to.have.property('_id');

    (mongooseModel.create as any).restore();
  });

});

describe('CarModel read method', () => {

  it('Should return all cars if all goes well', async () => {
    const { carModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'find').resolves([{ ...validCar, _id: newId }] as any[]);

    const [car] = await carModel.read();
    
    expect(car).to.have.property('model');
    expect(car).to.have.property('year');
    expect(car).to.have.property('color');
    expect(car).to.have.property('buyValue');
    expect(car).to.have.property('seatsQty');
    expect(car).to.have.property('doorsQty');
    expect(car).to.have.property('_id');

    (mongooseModel.find as any).restore();
  });

});

describe('CarModel readOne method', () => {

  it('Should return the car if all goes well', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { carModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'findById').resolves({ ...validCar, _id: newId } as any);

    const car = await carModel.readOne(validId);
    
    expect(car).to.have.property('model');
    expect(car).to.have.property('year');
    expect(car).to.have.property('color');
    expect(car).to.have.property('buyValue');
    expect(car).to.have.property('seatsQty');
    expect(car).to.have.property('doorsQty');
    expect(car).to.have.property('_id');

    (mongooseModel.findById as any).restore();
  });

  it('Should return the null if has no car with this id', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { carModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'findById').resolves(null);

    const carNotFound = await carModel.readOne(validId);
    
    expect(carNotFound).to.be.null;

    (mongooseModel.findById as any).restore();
  });

});

describe('CarModel delete method', () => {

  it('Should return the car if all goes well', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { carModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'findByIdAndDelete').resolves({ ...validCar, _id: newId } as any);

    const car = await carModel.delete(validId);
    
    expect(car).to.have.property('model');
    expect(car).to.have.property('year');
    expect(car).to.have.property('color');
    expect(car).to.have.property('buyValue');
    expect(car).to.have.property('seatsQty');
    expect(car).to.have.property('doorsQty');
    expect(car).to.have.property('_id');

    (mongooseModel.findByIdAndDelete as any).restore();
  });

  it('Should return the null if has no car with this id', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { carModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'findByIdAndDelete').resolves(null);

    const carNotFound = await carModel.delete(validId);
    
    expect(carNotFound).to.be.null;

    (mongooseModel.findByIdAndDelete as any).restore();
  });

});

describe('CarModel update method', () => {

  it('Should return the car if all goes well', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { carModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'findByIdAndUpdate').resolves({ ...validCar, _id: newId } as any);

    const car = await carModel.update(validId, validCar);
    
    expect(car).to.have.property('model');
    expect(car).to.have.property('year');
    expect(car).to.have.property('color');
    expect(car).to.have.property('buyValue');
    expect(car).to.have.property('seatsQty');
    expect(car).to.have.property('doorsQty');
    expect(car).to.have.property('_id');

    (mongooseModel.findByIdAndUpdate as any).restore();
  });

  it('Should return the null if has no car with this id', async () => {
    const validId = '62644a7a0ae3be566e672f14';
    const { carModel, mongooseModel } = factories();

    sinon.stub(mongooseModel, 'findByIdAndUpdate').resolves(null);

    const carNotFound = await carModel.update(validId, validCar);
    
    expect(carNotFound).to.be.null;

    (mongooseModel.findByIdAndUpdate as any).restore();
  });

});
