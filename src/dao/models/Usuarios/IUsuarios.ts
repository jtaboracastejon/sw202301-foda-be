import { ObjectId } from "mongodb";
import { IAuditable } from "../IAuditable";


export enum EUserStates{
    "ACT" = "Active",
    "INA" = "Inactive",
    "BLQ" = "Blocked"
}
export interface IUsuario extends IAuditable {
    _id?: ObjectId | String;
    correo: string;
    nombre: string;
    password: string;
    roles: Array<String|number>;
    ultimoAcceso?: Date;
    state: EUserStates;
    pswExpires: Date;
    avatar?: string;
}

export const DefaultUsuario: IUsuario = {
    correo: "",
    nombre: "",
    password: "",
    roles: ["public"],
    state: EUserStates.ACT,
    createdAt: new Date(),
    updatedAt: new Date(),
    pswExpires: new Date (new Date().getTime() + (3 * 30 * 24 * 60 * 60 * 1000))
}
