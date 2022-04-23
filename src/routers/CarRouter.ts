import { Router } from 'express';
import { CarController } from '../controllers';

export default class CarRouter {
  constructor(
    public carController = new CarController(),
    public router = Router(),
  ) {
    this.getsMethods();
    this.postsMethods();
    this.putsMethods();
    this.deletesMethods();
  }

  getsMethods() {
    this.router.get('/', this.carController.read);
    this.router.get('/:id', this.carController.readOne);
  }

  postsMethods() {
    this.router.post('/', this.carController.create);
  }

  putsMethods() {
    this.router.put('/:id', this.carController.update);
  }

  deletesMethods() {
    this.router.delete('/:id', this.carController.delete);
  }
}
