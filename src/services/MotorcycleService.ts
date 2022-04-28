import {
  Motorcycle,
  MotorcycleResponse,
  ErrorResponse,
  HttpResponse,
  Model,
  Service,
} from '../interfaces';
import { MotorcycleModel } from '../models';
import { motorcycleValidator, errors, idValidator } from '../utils';

const {
  notFoundResponse,
  invalidBodyResponse,
} = errors;

class MotorcycleService implements Service<Motorcycle, MotorcycleResponse> {
  private $model: Model<MotorcycleResponse>;

  constructor(
    model: Model<MotorcycleResponse> = new MotorcycleModel(),
  ) {
    this.$model = model;
  }

  get model() { return this.$model; }

  async create(
    body: Motorcycle,
  ): Promise<HttpResponse<MotorcycleResponse | ErrorResponse>> {
    if (!Object.keys(body).length) return invalidBodyResponse;
    
    const { message: isNotValid } = motorcycleValidator(body);

    if (isNotValid) return { statusCode: 400, body: { error: isNotValid } };

    const createdMotorcycle = await this.model.create(body);

    return { statusCode: 201, body: createdMotorcycle };
  }

  async read(): Promise<HttpResponse<MotorcycleResponse[]>> {
    const allMotorcycles = await this.model.read();

    return { statusCode: 200, body: allMotorcycles };
  }

  async readOne(
    id: string,
  ): Promise<HttpResponse<MotorcycleResponse | ErrorResponse>> {
    const { message: isNotValid } = idValidator({ _id: id });

    if (isNotValid) return { statusCode: 400, body: { error: isNotValid } };

    const motorcycle = await this.model.readOne(id);

    if (!motorcycle) return notFoundResponse;

    return { statusCode: 200, body: motorcycle };
  }

  async delete(
    id: string,
  ): Promise<HttpResponse<MotorcycleResponse | ErrorResponse>> {
    const { message: isNotValid } = idValidator({ _id: id });

    if (isNotValid) return { statusCode: 400, body: { error: isNotValid } };

    const deletedMotorcycle = await this.model.delete(id);

    if (!deletedMotorcycle) return notFoundResponse;

    return { statusCode: 204, body: deletedMotorcycle };
  }

  async update(
    body: Motorcycle,
    id: string,
  ): Promise<HttpResponse<MotorcycleResponse | ErrorResponse>> {
    const { message: isNotValid } = idValidator({ _id: id });

    if (isNotValid) return { statusCode: 400, body: { error: isNotValid } };

    const updatedMotorcycle = await this.model.update(id, body);

    if (!updatedMotorcycle) return notFoundResponse;

    return { statusCode: 200, body: updatedMotorcycle };
  }
}

export default MotorcycleService;
