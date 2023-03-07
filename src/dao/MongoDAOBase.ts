import {
  Db,
  Collection,
  Document,
  ObjectId,
  Filter,
  OptionalUnlessRequiredId,
  FindOptions,
  AggregateOptions,
  UpdateFilter
} from 'mongodb';

import { IDataAccessObject } from './IDataAccessObject';
import { IDBConnection } from './IDBConnection';

export abstract class MongoDAOBase<T> implements IDataAccessObject {
  public persistanceName: string;
  private connection: Db;
  private conectionFactory: IDBConnection;
  private collection: Collection<T>;
  public constructor(entityName: string, connection: IDBConnection) {
    this.persistanceName = entityName;
    this.conectionFactory = connection;
  }
  public async init() {
    this.connection = await this.conectionFactory.getConnection();
    this.collection = this.connection.collection(this.persistanceName);
  }
  findAll() {
    return this.collection.find({}).toArray();
  }
  findById(id: string) {
    const _id: Filter<T> = new ObjectId(id) as Filter<T>;
    return this.collection.findOne({ _id });
  }
  create(newEntity: Partial<T>) {
    return this.collection.insertOne(newEntity as OptionalUnlessRequiredId<T>);
  }
  update(id: string, updateEntity: Partial<T>) {
    const _id = new ObjectId(id) as Filter<T>;
    const updateObj = { "$set": updateEntity };
    return this.collection.updateOne({ _id }, updateObj);
  }
  delete(id: string) {
    const _id = new ObjectId(id) as Filter<T>;
    return this.collection.deleteOne({ _id });
  }
  findByFilter(filter: Filter<T>, options: FindOptions<T> = {},) {
    return this.collection.find(filter, options).toArray();
  }
  findOneByFilter(filter: Filter<T>, options: FindOptions<T> = {},) {
    return this.collection.findOne(filter, options);
  }
  aggregate(stages: Document[], options: AggregateOptions) {
    return this.collection.aggregate(stages, options).toArray();
  }
  getConnection() {
    return this.connection;
  }
  rawUpdate(filter: Filter<T>, update: UpdateFilter<T>){
    return this.collection.updateOne(filter, update);
  }
  getIDFromString(id: string){
    return new ObjectId(id);
  }
}