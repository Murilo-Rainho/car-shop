import { Router } from 'express';
import { MotorcycleController } from '../controllers';

export default class MotorcycleRouter {
  constructor(
    public motorcycleController = new MotorcycleController(),
    public router = Router(),
  ) {
    this.getsMethods();
    this.postsMethods();
    this.putsMethods();
    this.deletesMethods();
  }

  getsMethods() {
    this.router.get('/', this.motorcycleController.read);
    this.router.get('/:id', this.motorcycleController.readOne);
  }

  postsMethods() {
    this.router.post('/', this.motorcycleController.create);
  }

  putsMethods() {
    this.router.put('/:id', this.motorcycleController.update);
  }

  deletesMethods() {
    this.router.delete('/:id', this.motorcycleController.delete);
  }
}
