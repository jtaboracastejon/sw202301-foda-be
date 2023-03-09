import { IDataAccessObject } from "@dao/IDataAccessObject";
import { UsuariosDao } from "@dao/models/Usuarios/UsuariosDao";
import { DefaultUsuario, IUsuario } from "@dao/models/Usuarios/IUsuarios";

export class Usuarios{
    private usuariosDao: UsuariosDao;
    constructor(usuarios: IDataAccessObject){
        this.usuariosDao = usuarios as UsuariosDao;
    }

    public async newUser(usuario: IUsuario){
        try {
            const newUser: IUsuario = {
                ...DefaultUsuario,
                ...usuario
            }
            const result = await this.usuariosDao.create(newUser);
            console.log('newUser result:', result);
            const rt = await this.usuariosDao.findByFilter({_id: result?.insertedId})
            return rt;
        } catch (error) {
            console.error('newUser error:', error);
            return null
        }
    }

    public async getAll(){
        return this.usuariosDao.findAll();
    }

    private async setUpdates(userId: string, updateCmd: Partial<IUsuario>){
        await this.usuariosDao.update(userId, { ...updateCmd, updatedAt: new Date() });
        const updatedUsuario = await this.usuariosDao.findById(userId);
        return updatedUsuario;
    }

    public updateUser(userId: string, uptUser: Partial<IUsuario>){
        return this.setUpdates(userId, uptUser);
    }

    public async deleteUser(id: string){
        return this.usuariosDao.delete(id);
    }

    public setUltimoAcceso(userId: string, ultimoAcceso: Date){
        return this.setUpdates(userId, { ultimoAcceso });
    }
}