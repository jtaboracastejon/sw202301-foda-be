import { MongoDAOBase } from "@server/dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { DefaultFoda, IFoda } from "./IFoda";
import { IDataAccessObject } from "@dao/IDataAccessObject";
import { ObjectId } from "mongodb";

export class FodaDao extends MongoDAOBase<IFoda>{
    private empresaDao: IDataAccessObject;
    constructor(conexion: IDBConnection, empresaDao: IDataAccessObject){
        super("foda", conexion);
        this.empresaDao = empresaDao;
    }

    public async create(foda:IFoda){
        const {empresa: {id}} = foda;
        if(!ObjectId.isValid(id)){
            throw Error("Empresa object Id not valid")
        }
        const {_id, nombre} = await this.empresaDao.findById(id.toString());
        const newFoda = {
            ...DefaultFoda,
            ...foda,
            ...{empresa:{id:_id, nombre}},
            ...{createdAt: new Date(), updatedAt: new Date()}
        };
        return super.create(newFoda)
    }
}