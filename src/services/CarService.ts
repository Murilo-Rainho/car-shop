import {
  Car,
  CarResponse,
  ErrorResponse,
  HttpResponse,
  Model,
  Service,
} from '../interfaces';
import { CarModel } from '../models';
import { carValidator, errors, idValidator } from '../utils';

const {
  notFoundResponse,
  invalidBodyResponse,
} = errors;

export default class CarService implements Service<Car, CarResponse> {
  private $model: Model<Car, CarResponse>;

  constructor(
    model: Model<Car, CarResponse> = new CarModel(),
  ) {
    this.$model = model;
  }

  get model() { return this.$model; }

  async create(body: Car): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    if (!Object.keys(body).length) return invalidBodyResponse;

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
      return notFoundResponse;
    }

    return { statusCode: 200, body: car };
  }

  async delete(id: string): Promise<HttpResponse<CarResponse | ErrorResponse>> {
    const { message: isNotValid } = idValidator({ _id: id });

    if (isNotValid) return { statusCode: 400, body: { error: isNotValid } };

    const deletedCar = await this.model.delete(id);

    if (!deletedCar) {
      return notFoundResponse;
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
      return notFoundResponse;
    }

    return { statusCode: 200, body: updatedCar };
  }
}
