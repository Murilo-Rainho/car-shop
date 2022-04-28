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
