import { IDBConnection } from "@dao/IDBConnection";
import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IEmpresa } from "./iEmpresas";

export class EmpresasDao extends MongoDAOBase<IEmpresa>{
    constructor(conexion: IDBConnection){
        conexion.getConnection().then((db)=>{
            super("empresas", db);
        })
    }
}