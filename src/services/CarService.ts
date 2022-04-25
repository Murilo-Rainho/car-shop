import {
  Car,
  CarResponse,
  ErrorResponse,
  HttpResponse,
  Model,
  Service,
} from '../interfaces';
import { CarModel } from '../models';
import { carValidator, errorMessages, idValidator } from '../utils';

const {
  notFound,
  withoutBody,
} = errorMessages;

export default class CarService implements Service<Car, CarResponse> {
  private $model: Model<Car, CarResponse>;

  constructor() {
    this.$model = new CarModel();
  }

  get model() { return this.$model; }

  async create(body: Car): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    if (!Object.keys(body).length) {
      return { statusCode: 400, body: { error: withoutBody } };
    }

    const { message: isNotValid } = carValidator(body);

    if (isNotValid) return { statusCode: 400, body: { error: isNotValid } };

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
    const { message: isNotValid } = idValidator({ _id: id });

    if (isNotValid) return { statusCode: 400, body: { error: isNotValid } };

    const car = await this.model.readOne(id);

    if (!car) {
      return { statusCode: 404, body: { error: notFound } };
    }

    return { statusCode: 200, body: car };
  }

  async delete(id: string): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    const { message: isNotValid } = idValidator({ _id: id });

    if (isNotValid) return { statusCode: 400, body: { error: isNotValid } };

    const deletedCar = await this.model.delete(id);

    if (!deletedCar) {
      return { statusCode: 404, body: { error: notFound } };
    }

    return { statusCode: 204, body: deletedCar };
  }

  async update(
    body: Car,
    id: string,
  ): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    const { message: isNotValid } = idValidator({ _id: id });

    if (isNotValid) return { statusCode: 400, body: { error: isNotValid } };

    const updatedCar = await this.model.update(id, body);

    if (!updatedCar) {
      return { statusCode: 404, body: { error: notFound } };
    }

    return { statusCode: 200, body: updatedCar };
  }
}
