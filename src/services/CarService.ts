import { Car, CarResponse, Service } from '../interfaces';
import { CarModel } from '../models';

export default class CarService implements Service<Car, CarResponse> {
  private $model: CarModel;

  constructor() {
    this.$model = new CarModel();
  }

  get model() { return this.$model; }

  async create(body: Car): Promise<CarResponse> {
    const createdCar = await this.model.create(body);

    return createdCar;
  }

  async read(): Promise<CarResponse[]> {
    const allCars = await this.model.read();

    return allCars;
  }

  async readOne(id: string): Promise<CarResponse | null> {
    const car = await this.model.readOne(id);

    return car;
  }

  async delete(id: string): Promise<CarResponse | null> {
    const deletedCar = await this.model.delete(id);

    return deletedCar;
  }

  async update(body: Car, id: string): Promise<CarResponse | null> {
    const updatedCar = await this.model.update(id, body);

    return updatedCar;
  }
}
