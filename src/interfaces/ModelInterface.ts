export interface Model<U, T> {
  create(payload: U): Promise<T>;
  read(): Promise<T[]>;
  readOne(id: string): Promise<T | null>;
  update(id: string, payload: U): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
