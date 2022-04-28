import { Vehicle } from './VehicleInterface';

export type MotorcycleCategory = 'Street' | 'Custom' | 'Trail';

export interface Motorcycle extends Vehicle {
  category: MotorcycleCategory;
  engineCapacity: number;
}
