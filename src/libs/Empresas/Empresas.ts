import { IEmpresa } from "@dao/models/Empresas/iEmpresas";
import { IDataAccessObject } from "@dao/IDataAccessObjects";
export class Empresas{
    private dao: IDataAccessObject;
    constructor(dao:IDataAccessObject){
        this.dao = dao;
    }
    getAll(){
        return this.dao.findAll();
    }
    getById(id: string){
        return this.dao.findById(id);
    }
    add(nuevaEmpresa : IEmpresa){
        const date = new Date();
        const nueva: IEmpresa = {
            ...nuevaEmpresa, 
            created: date, 
            updated: date
        };
        return this.dao.create(nueva);
    }
    update(id : string, updateEmpresa : IEmpresa){
        const updateObj = {...updateEmpresa, updated: new Date()};
        return this.dao.update(id, updateObj);
        
    }
    delete(id: string){
        return this.dao.delete(id);
    }
}