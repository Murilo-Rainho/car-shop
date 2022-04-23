export interface Service<T, U> {
  create(body: T): Promise<U>;
  read(): Promise<U[]>;
  readOne(id: string): Promise<U | null>;
  update(body: T, id: string): Promise<U | null>;
  delete(id: string): Promise<U | null>;
}
