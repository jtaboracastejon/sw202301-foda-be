import { MongoDAOBase } from "@server/dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IUsuario } from "@server/dao/models/Usuarios/IUsuarios";

export class UsuariosDao extends MongoDAOBase<IUsuario>{
    constructor(conexion: IDBConnection){
        super("usuarios", conexion)
    }
}