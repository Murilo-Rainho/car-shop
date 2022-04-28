import mongoose from 'mongoose';
import { MotorcycleResponse, Model, Motorcycle } from '../interfaces';

export const motorcycleSchema = new mongoose.Schema<Motorcycle>(
  {
    buyValue: { type: Number, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    engineCapacity: { type: Number, required: true },
    model: { type: String, required: true },
    status: { type: Boolean, required: false },
    year: { type: Number, required: true },
  },
  {
    versionKey: false,
  },
);

export class MotorcycleModel implements Model<MotorcycleResponse> {
  constructor(
    private $model = mongoose.model('Motorcycles', motorcycleSchema),
  ) {}

  get model() { return this.$model; }

  async create(body: Motorcycle): Promise<MotorcycleResponse> {
    const createdMotorcycle: MotorcycleResponse = await this.model.create(body);

    return createdMotorcycle;
  }

  async read(): Promise<MotorcycleResponse[]> {
    const allMotorcycles: MotorcycleResponse[] = await this.model.find();

    return allMotorcycles;
  }

  async readOne(id: string): Promise<MotorcycleResponse | null> {
    const car: MotorcycleResponse | null = await this.model.findById(id);

    return car;
  }

  async delete(id: string): Promise<MotorcycleResponse | null> {
    const deletedCar: MotorcycleResponse | null = await this.model
      .findByIdAndDelete(id);

    return deletedCar;
  }

  async update(
    id: string,
    body: Partial<MotorcycleResponse>,
  ): Promise<MotorcycleResponse | null> {
    const updatedCar: MotorcycleResponse | null = await this.model
      .findByIdAndUpdate(id, body, { new: true });

    return updatedCar;
  }
}
