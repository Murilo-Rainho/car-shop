import mongoose from 'mongoose';
import { Car } from './CarInterface';

export interface CarResponse extends Car {
  _id: mongoose.Types.ObjectId;
}