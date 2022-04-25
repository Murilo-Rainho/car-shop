import mongoose from 'mongoose';
import { CarResponse } from '../../../interfaces';

export const validCar: CarResponse = {
  _id: new mongoose.Types.ObjectId(),
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2,
};
