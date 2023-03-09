import { IDataAccessObject } from "@dao/IDataAccessObject";
import { UsuariosDao } from "@dao/models/Usuarios/UsuariosDao";
import { IUsuario } from "@dao/models/Usuarios/IUsuarios";
import { Security } from "@server/utils/Security";

export class Usuarios{
    private usuariosDao: UsuariosDao;
    constructor(usuarios: IDataAccessObject){
        this.usuariosDao = usuarios as UsuariosDao;
    }

    public async newUser(usuario: IUsuario){
        try {
            usuario.password = Security.encodePassword(usuario.password);
            const result = await this.usuariosDao.create(usuario);
            console.log('newUser result:', result);
            const rt = await this.usuariosDao.findOneByFilter({_id: result?.insertedId})
            delete rt.password
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

    public async loginUser(email:string, password:string){
        try {
            const dbUser = await this.usuariosDao.findOneByFilter({email});
            if(Security.verifyPassword(password, dbUser.password)){
                delete dbUser.password;
                //JWT
            }
        } catch (error) {
            console.error(error)
            throw new Error("Can't validate credentials");
        }
    }
}