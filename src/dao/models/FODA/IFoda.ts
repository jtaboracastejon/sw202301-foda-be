import { ObjectId } from "mongodb";
import { IAuditable } from "../IAuditable";

export enum IFodaEstados {
    Planning = "P",
    Execution = "E",
    Finished = "F",
    Canceled = "C"
}

export interface IFoda extends IAuditable {
    _id?: ObjectId | String;
    nombre: string,
    owner: {
        id: ObjectId | string,
        usuario: string,
        email: string
    },
    empresa: {
        id: ObjectId | string,
        nombre?: string
    },
    estado: IFodaEstados,
    entradas: number,
    observacion?: string,
    Fcantidad: number,
    Ocantidad: number,
    Dcantidad: number,
    Acantidad: number,
}

export const DefaultFoda: IFoda = {
    nombre: "",
    owner: {
        id: new ObjectId,
        usuario: "",
        email: ""
    },
    empresa: {
        id: new ObjectId,
        nombre: ""
    },
    entradas: 0,
    Fcantidad: 0,
    Ocantidad: 0,
    Dcantidad: 0,
    Acantidad: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    estado: IFodaEstados.Planning
}