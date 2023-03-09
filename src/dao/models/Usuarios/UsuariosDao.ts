import { MongoDAOBase } from "@server/dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IUsuario, DefaultUsuario } from "@server/dao/models/Usuarios/IUsuarios";

export class UsuariosDao extends MongoDAOBase<IUsuario>{
    constructor(conexion: IDBConnection){
        super("usuarios", conexion)
    }

    public async create(user: Partial<IUsuario>){
        const newUser = {...DefaultUsuario, ...user};
        return super.create(newUser)
    }
}