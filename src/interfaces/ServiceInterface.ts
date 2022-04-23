import { HttpResponse } from './HttpResponse';

export interface Service<T, U> {
  create(body: T): Promise<HttpResponse<U>>;
  read(): Promise<HttpResponse<U[]>>;
  readOne(id: string): Promise<HttpResponse<U | null>>;
  update(body: T, id: string): Promise<HttpResponse<U | null>>;
  delete(id: string): Promise<HttpResponse<U | null>>;
}
