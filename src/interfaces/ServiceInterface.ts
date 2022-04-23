import { ErrorResponse } from './ErrorResponse';
import { HttpResponse } from './HttpResponse';

export interface Service<T, U> {
  create(body: T): Promise<HttpResponse<U | ErrorResponse>>;
  read(): Promise<HttpResponse<U[]>>;
  readOne(id: string): Promise<HttpResponse<U | ErrorResponse>>;
  update(body: T, id: string): Promise<HttpResponse<U | ErrorResponse>>;
  delete(id: string): Promise<HttpResponse<U | ErrorResponse>>;
}
