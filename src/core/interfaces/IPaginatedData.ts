import { BaseEntity } from '../entity/base.entity';

export interface IPaginatedData<T extends BaseEntity> {
  total: number;
  pages?: number;
  currentPage?: number;
  items: T[];
}
