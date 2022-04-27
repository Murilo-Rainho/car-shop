import mongoose from 'mongoose';
import { Car, CarResponse, Model } from '../interfaces';

export const CarSchema = new mongoose.Schema<Car>(
  {
    buyValue: { type: Number, required: true },
    color: { type: String, required: true },
    doorsQty: { type: Number, required: true },
    model: { type: String, required: true },
    seatsQty: { type: Number, required: true },
    status: { type: Boolean, required: false },
    year: { type: Number, required: true },
  },
  {
    versionKey: false,
  },
);

export class CarModel implements Model<CarResponse> {
  constructor(private $model = mongoose.model('Cars', CarSchema)) {}

  get model() { return this.$model; }

  async create(body: Car): Promise<CarResponse> {
    const createdCar: CarResponse = await this.model.create(body);

    return createdCar;
  }

  async read(): Promise<CarResponse[]> {
    const allCars: CarResponse[] = await this.model.find();

    return allCars;
  }

  async readOne(id: string): Promise<CarResponse | null> {
    const car: CarResponse | null = await this.model.findById(id);

    return car;
  }

  async delete(id: string): Promise<CarResponse | null> {
    const deletedCar: CarResponse | null = await this.model
      .findByIdAndDelete(id);

    return deletedCar;
  }

  async update(id: string, body: Car): Promise<CarResponse | null> {
    const updatedCar: CarResponse | null = await this.model
      .findByIdAndUpdate(id, body, { new: true });

    return updatedCar;
  }
}
