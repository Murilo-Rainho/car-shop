import { NextFunction as Next, Request as Req, Response as Res } from 'express';

export interface Controller<T> {
  create(req: Req, res: Res, next: Next): Promise<Res<T> | void>;
  read(req: Req, res: Res, next: Next): Promise<Res<T[]> | void>;
  readOne(req: Req, res: Res, next: Next): Promise<Res<T | null> | void>;
  update(req: Req, res: Res, next: Next): Promise<Res<T | null> | void>;
  delete(req: Req, res: Res, next: Next): Promise<Res<T | null> | void>;
}
