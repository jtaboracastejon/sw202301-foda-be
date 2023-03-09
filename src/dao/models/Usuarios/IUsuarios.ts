import { ObjectId } from "mongodb";
import { IAuditable } from "../IAuditable";

export interface IUsuario extends IAuditable {
    _id?: ObjectId | String;
    codigo?: string;
    correo: string;
    nombre: string;
    password: string;
    roles: Array<String|number>;
    ultimoAcceso: Date;
}

export const DefaultUsuario: IUsuario = {
    codigo: "",
    correo: "",
    nombre: "",
    password: "",
    roles: ["guest"],
    createdAt: new Date(),
    updatedAt: new Date(),
    ultimoAcceso: undefined
}
