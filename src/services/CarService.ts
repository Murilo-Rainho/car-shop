import { Car, CarResponse, HttpResponse, Service } from '../interfaces';
import { CarModel } from '../models';

export default class CarService implements Service<Car, CarResponse> {
  private $model: CarModel;

  constructor() {
    this.$model = new CarModel();
  }

  get model() { return this.$model; }

  async create(body: Car): Promise<HttpResponse<CarResponse>> {
    const createdCar = await this.model.create(body);

    return { statusCode: 201, body: createdCar };
  }

  async read(): Promise<HttpResponse<CarResponse[]>> {
    const allCars = await this.model.read();

    return { statusCode: 200, body: allCars };
  }

  async readOne(id: string): Promise<HttpResponse<CarResponse | null>> {
    const car = await this.model.readOne(id);

    return { statusCode: 200, body: car };
  }

  async delete(id: string): Promise<HttpResponse<CarResponse | null>> {
    const deletedCar = await this.model.delete(id);

    return { statusCode: 200, body: deletedCar };
  }

  async update(
    body: Car,
    id: string,
  ): Promise<HttpResponse<CarResponse | null>> {
    const updatedCar = await this.model.update(id, body);

    return { statusCode: 200, body: updatedCar };
  }
}
