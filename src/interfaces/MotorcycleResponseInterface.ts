import mongoose from 'mongoose';
import { Motorcycle } from './MotorcycleInterface';

export interface MotorcycleResponse extends Motorcycle {
  _id: mongoose.Types.ObjectId;
}
