import { InternalServerErrorException } from '@nestjs/common';

import { MongoError } from 'mongodb';
import { FilterQuery, Model, Types } from 'mongoose';

import { BaseEntity } from 'src/core/entity/base.entity';
import { IPaginatedData } from 'src/core/interfaces/IPaginatedData';
import { IPaginatorParams } from 'src/core/interfaces/IPaginatorParams';

export class BaseRepository<T extends BaseEntity> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  protected static throwMongoError(err: MongoError): void {
    throw new InternalServerErrorException(err, err.errmsg);
  }

  transform(x?: any): T | undefined {
    if (!x) {
      return undefined;
    }
    const entity: any = {};
    Object.keys(x)
      .filter((key) => key !== '_id')
      .forEach((key) => (entity[key] = x[key]));
    entity.id = x._id;
    return entity as T;
  }

  protected static toObjectId(id: string): Types.ObjectId {
    try {
      return Types.ObjectId(id);
    } catch (e) {
      this.throwMongoError(e);
    }
  }

  createModel(doc?: Partial<T>): T {
    return new this.model(doc);
  }

  getModel(): Model<T> {
    return this.model;
  }

  async findPaginated(
    filter = {},
    paginator?: IPaginatorParams,
    populate?: any,
    select?: any,
    sort?: any,
  ): Promise<IPaginatedData<T>> {
    let { page, limit } = paginator ?? { page: 1, limit: 10 };
    page = page ?? 1;
    limit = limit ?? 10;
    const count = await this.model.countDocuments(filter);
    const items = await this.model
      .find(filter)
      .select(select)
      .populate(populate)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sort)
      .lean();
    return {
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: page,
      items: items.map((item) => this.transform(item)),
    };
  }

  async find(filter: FilterQuery<T> = {}): Promise<T[] | any> {
    const records = await this.model.find(filter).lean();
    return records.map((item) => this.transform(item));
  }

  async findOne(
    filter: FilterQuery<T> = {},
    populate?: any,
    select?: any,
  ): Promise<T> {
    const record = await this.model
      .findOne(filter)
      .select(select)
      .populate(populate)
      .lean();
    return this.transform(record);
  }

  async findById(id: string): Promise<T> {
    const record = await this.model.findById(id).lean();
    return this.transform(record);
  }

  async create(item: T | any): Promise<T> {
    const createdRecord: any = await new this.model(item).save();
    return this.transform(createdRecord._doc);
  }

  async delete(
    filter: FilterQuery<T> = {},
  ): Promise<{ ok?: number; n?: number }> {
    return this.model.deleteMany(filter);
  }

  async deleteOne(filter: FilterQuery<T> = {}): Promise<T | any> {
    const deletedRecord = await this.model.findOneAndDelete(filter).lean();
    return this.transform(deletedRecord);
  }

  async deleteById(id: string): Promise<T> {
    const deletedRecord = await this.model.findByIdAndDelete(id).lean();
    return this.transform(deletedRecord);
  }

  async updateOne(
    filter: FilterQuery<T> = {},
    item: T | any,
    upsert = false,
  ): Promise<T> {
    const updatedRecord = await this.model
      .findOneAndUpdate(filter, { ...item }, { new: true, upsert: upsert })
      .lean();
    return this.transform(updatedRecord);
  }

  async update(filter: FilterQuery<T> = {}, item: T | any): Promise<any> {
    return this.model.updateMany(filter, { ...item });
  }

  async aggregate(pipe: any[]): Promise<any> {
    return this.model.aggregate(...pipe);
  }

  async count(filter = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }
}
