import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import { CarResponse, Controller } from '../interfaces';
import { CarService } from '../services';

export default class CarController implements Controller<CarResponse> {
  private $route: string;

  private $service: CarService;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    this.read = this.read.bind(this);
    this.readOne = this.readOne.bind(this);
    this.delete = this.delete.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);

    this.$route = route;
    this.$service = service;
  }

  get route() { return this.$route; }

  get service() { return this.$service; }

  async create(
    req: Req,
    res: Res,
    next: Next,
  ): Promise<Res<CarResponse> | void> {
    try {
      const { body, statusCode } = await this.service.create(req.body);
  
      return res.status(statusCode).json(body);
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
      const { body, statusCode } = await this.service.read();

      return res.status(statusCode).json(body);
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
      const { body, statusCode } = await this.service.readOne(id);

      return res.status(statusCode).json(body);
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
      
      const { body, statusCode } = await this.service.delete(id);

      return res.status(statusCode).json(body);
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
      const { body: reqBody, params: { id } } = req;
      const { body, statusCode } = await this.service.update(reqBody, id);
  
      return res.status(statusCode).json(body);
    } catch (error) {
      next(error);
    }
  }
}
