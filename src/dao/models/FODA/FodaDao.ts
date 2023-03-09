import { MongoDAOBase } from "@server/dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IFoda, DefaultFoda } from '@dao/models/FODA/IFoda';
import { IDataAccessObject } from "@dao/IDataAccessObject";
import { ObjectId } from "mongodb";

export class FodaDao extends MongoDAOBase<IFoda>{
    private empresaDao: IDataAccessObject;
    constructor(conexion: IDBConnection, empresaDao: IDataAccessObject){
        super("foda", conexion);
        this.empresaDao = empresaDao;
    }

    public async create(foda:Partial<IFoda>){
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

    public async updateCounter(fodaId: string | ObjectId, type: 'F'|'D'|'O'|'A') {
        let oFodaId = typeof fodaId == 'string' ? new ObjectId(fodaId): fodaId;
        let filter = {_id:oFodaId};
        let updateCmd = {"$inc":{"entradas":1}, "$set": {"updatedAt":new Date()}};
        updateCmd["$inc"][`${type}cantidad`] = 1;
        console.log('updateCounter:', {updateCmd, oFodaId})
        return super.rawUpdate(filter, updateCmd);
    }
}