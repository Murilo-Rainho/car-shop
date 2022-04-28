import express from 'express';
import connectToDatabase from './connection';
import { CarRouter, MotorcycleRouter } from './routers';

class App {
  public app: express.Application;

  constructor(
    private carRouter = new CarRouter(),
    private motorcycleRouter = new MotorcycleRouter(),
  ) {
    this.app = express();
    this.app.use(express.json());

    this.app.get('/ping', (_req, res) => res.status(200).json('pong'));
    this.addRouters();
  }

  public startServer(PORT: string | number = 3001): void {
    connectToDatabase();
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  public addRouters() {
    this.app.use('/cars', this.carRouter.router);
    this.app.use('/motorcycles', this.motorcycleRouter.router);
  }

  public getApp() {
    return this.app;
  }
}

export default App;
