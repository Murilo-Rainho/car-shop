import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import { CarResponse, Controller } from '../interfaces';
import { CarService } from '../services';

export default class CarController implements Controller<CarResponse> {
  private $route: string;

  private $service: CarService;

  constructor(
    route = '/cars',
  ) {
    this.read = this.read.bind(this);
    this.readOne = this.readOne.bind(this);
    this.delete = this.delete.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);

    this.$route = route;
    this.$service = new CarService();
  }

  get route() { return this.$route; }

  get service() { return this.$service; }

  async create(
    req: Req,
    res: Res,
    next: Next,
  ): Promise<Res<CarResponse> | void> {
    try {
      const createdCar = await this.service.create(req.body);
  
      return res.status(201).json(createdCar);
    } catch (error) {
      next(error);
    }
  }

  async read(
    _req: Req,
    res: Res,
    next: Next,
  ): Promise<Res<CarResponse[]> | void> {
    try {
      const allCars = await this.service.read();

      return res.status(200).json(allCars);
    } catch (error) {
      next(error);
    }
  }

  async readOne(
    req: Req,
    res: Res,
    next: Next,
  ): Promise<Res<CarResponse | null> | void> {
    try {
      const { id } = req.params;
      const car = await this.service.readOne(id);

      if (!car) return res.status(404).json(null);

      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Req,
    res: Res,
    next: Next,
  ): Promise<Res<CarResponse | null> | void> {
    try {
      const { id } = req.params;
      const deletedCar = await this.service.delete(id);

      return res.status(200).json(deletedCar);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Req,
    res: Res,
    next: Next,
  ): Promise<Res<CarResponse | null> | void> {
    try {
      const { body, params: { id } } = req;
      const updatedCar = await this.service.update(body, id);
  
      return res.status(200).json(updatedCar);
    } catch (error) {
      next(error);
    }
  }
}
