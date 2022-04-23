import {
  Car,
  CarResponse,
  ErrorResponse,
  HttpResponse,
  Service,
} from '../interfaces';
import { CarModel } from '../models';
import { errorMessages } from '../utils';

export default class CarService implements Service<Car, CarResponse> {
  private $model: CarModel;

  constructor() {
    this.$model = new CarModel();
  }

  get model() { return this.$model; }

  async create(body: Car): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    if (!body) {
      return { statusCode: 400, body: { message: errorMessages.withoutBody } };
    }

    const createdCar = await this.model.create(body);

    return { statusCode: 201, body: createdCar };
  }

  async read(): Promise<HttpResponse<CarResponse[]>> {
    const allCars = await this.model.read();

    return { statusCode: 200, body: allCars };
  }

  async readOne(
    id: string,
  ): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    const car = await this.model.readOne(id);

    if (!car) {
      return { statusCode: 404, body: { message: errorMessages.carNotFound } };
    }

    return { statusCode: 200, body: car };
  }

  async delete(id: string): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    const deletedCar = await this.model.delete(id);

    if (!deletedCar) {
      return { statusCode: 404, body: { message: errorMessages.carNotFound } };
    }

    return { statusCode: 200, body: deletedCar };
  }

  async update(
    body: Car,
    id: string,
  ): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    const updatedCar = await this.model.update(id, body);

    if (!updatedCar) {
      return { statusCode: 404, body: { message: errorMessages.carNotFound } };
    }

    return { statusCode: 200, body: updatedCar };
  }
}
