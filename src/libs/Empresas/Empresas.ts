//Una interfaz nos permite definir el tipo de un objeto
export interface IEmpresa{
    codigo: string;
    nombre: string;
    status: string;
    created?: Date;
    updated?: Date;
    observacion?: string;
}

export class Empresas{
    private empresas: IEmpresa [];
    constructor(){
        this.empresas = [];
    }
    add(nuevaEmpresa : IEmpresa){
        const date = new Date();
        const nueva: IEmpresa = {
            ...nuevaEmpresa, 
            codigo: (Math.random() * 1000).toString() + new Date().getTime().toString(),
            created: date, 
            updated: date
        };
        this.empresas.push(nueva);
        return true;
    }

    getAll(){
        return this.empresas;
    }

    getById(codigo: string){
        const empresaToReturn = this.empresas.find((emp) => {
            return emp.codigo === codigo;
        });
        return empresaToReturn;
    }

    update(updateEmpresa: IEmpresa){
        const newEmpresas : IEmpresa[] = this.empresas.map((emp)=>{
            if(emp.codigo === updateEmpresa.codigo){
                return {...emp, ...updateEmpresa, updated: new Date()}
            }
            return emp;
        })
        this.empresas = newEmpresas;
        return true;
    }
    delete(codigo: string){
        const empresasToDelete = this.empresas.find((emp) => {
            return emp.codigo === codigo;
        });
        if(empresasToDelete){
            const newEmpresas : IEmpresa[] = this.empresas.filter((emp) =>{
                return emp.codigo !== codigo;
            })
            this.empresas = newEmpresas;
            return true;
        }
        return false;
    }
}