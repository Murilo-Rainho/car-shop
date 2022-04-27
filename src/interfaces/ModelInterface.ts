export interface Model<T> {
  create(payload: Partial<T>): Promise<T>;
  read(): Promise<T[]>;
  readOne(id: string): Promise<T | null>;
  update(id: string, payload: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
