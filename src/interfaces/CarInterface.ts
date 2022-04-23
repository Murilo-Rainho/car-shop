import mongoose from 'mongoose';
import { Vehicle } from './VehicleInterface';

export interface Car extends Vehicle {
  doorsQty: number;
  seatsQty: number;
}

export interface CarResponse extends Car {
  _id: mongoose.Types.ObjectId;
}
