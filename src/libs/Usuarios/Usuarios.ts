export interface IUsuario {
    codigo: string;
    correo: string;
    nombre: string;
    password: string;
    roles: string[];
    creado?: Date;
    ultimoAcceso?: Date;
}

export class Usuarios {
    private usuarios: IUsuario[];
    constructor() {
        this.usuarios = [];
    }

    add(nuevoUsuario : IUsuario){
        const date = new Date();
        const nuevo : IUsuario = {
            ...nuevoUsuario,
            codigo: (Math.random() * 1000).toString() + new Date().getTime().toString(),
            creado: date,
            ultimoAcceso: date
        };
        this.usuarios.push(nuevo);
        return true;
    }

    getAll(){
        return this.usuarios;
    }

    getById(codigo: string){
        const usuarioToReturn = this.usuarios.find((usu) => {
            return usu.codigo === codigo;
        });
        return usuarioToReturn;
    }

    update(updateUsuario: IUsuario){
        const newUsuarios : IUsuario[] = this.usuarios.map((usu)=>{
            if(usu.codigo === updateUsuario.codigo){
                return {...usu, ...updateUsuario, ultimoAcceso: new Date()}
            }
            return usu;
        })
        this.usuarios = newUsuarios;
        return true;
    }

    delete(codigo: string){
        const empresasToDelete = this.usuarios.find((usu) => {
            return usu.codigo === codigo;
        });

        if(empresasToDelete){
            const newUsuarios : IUsuario[] = this.usuarios.filter((usu) =>{
                return usu.codigo !== codigo;
            })
            this.usuarios = newUsuarios;
            return true;
        }
        return false;
    }
}