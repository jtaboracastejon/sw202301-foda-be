import { Db, Collection, ObjectId,Filter, OptionalUnlessRequiredId } from "mongodb";
import { IDataAccessObject } from "./IDataAccessObjects";

export abstract class MongoDAOBase<T> implements IDataAccessObject{
    public persistanceName: string;
    private connection: Db;
    private collection: Collection<T>;

    public constructor(entityName:string, connection:Db){
        this.persistanceName = entityName;
        this.connection = connection;
        this.collection = this.connection.collection(this.persistanceName);
    }

    findAll(){
        this.collection.find({}).toArray()
    };
    findById(id:string){
        const _id: Filter<T> = new ObjectId(id) as Filter<T>;
        return this.collection.findOne({_id});
    };
    create(newEntity: Partial<T>){
        this.collection.insertOne(newEntity as OptionalUnlessRequiredId<T>)
    };
    update(id:string, updateEntity: Partial<T>){
        const _id = new ObjectId(id) as Filter<T>;
        const updateObj = {"$set": updateEntity};
        return this.collection.updateOne({_id}, updateObj)
    }
    delete(id:string){
        const _id = new ObjectId(id) as Filter<T>;
        return this.collection.deleteOne({_id});
    };
    findByFilter: Function;
    findOneByFilter: Function;
    aggregate: Function;
    getConnection(){
        return this.connection;
    };
    rawUpdate: Function;
}