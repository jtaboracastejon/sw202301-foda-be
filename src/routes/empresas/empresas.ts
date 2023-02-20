import express from 'express';
const router = express.Router();

import { EmpresasDao } from '@dao/models/Empresas/EmpresasDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { Empresas } from '@libs/Empresas/Empresas';
import { IEmpresa } from '@dao/models/Empresas/iEmpresas';

const empresasModel = new Empresas(new EmpresasDao(MongoDBConn));

empresasModel.add({
    codigo: "",
    nombre: "Empresa 1",
    status: "Activo"
});

//registrar los endpoint en router
router.get('/', (_req, res) => {
    const jsonUrls = {
        "getAll": {"method:": "GET", "url": "empresas/all"},
        "getById": {"method:": "GET", "url": "empresas/byid/:id"},
        "new": {"method:": "POST", "url": "empresas/new"},
        "update": {"method:": "PUT", "url": "empresas/upd/:id"},
        "delete": {"method:": "DELETE", "url": "empresas/del/:id"}
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
    res.status(200).json(await empresasModel.getAll());
});

router.get('/byid/:id', async (req, res) => {
    const { id } = req.params;
    const empresa = await empresasModel.getById(id);
    if(empresa){
        return res.status(200).json(empresa);
    }
    return res.status(404).json({error: "No se encontró la empresa"});
});

router.post('/new', async (req, res) => {
    const {codigo = "NA", nombre = "John Doe Corp", status = "Activo"} = req.body;
    //TODO: Validar Entrada de datos
    const newEmpresa: IEmpresa = {
        codigo,
        nombre,
        status
    };
    if(await empresasModel.add(newEmpresa)){
        res.status(200).json({created: true});
    }
    return res.status(404).json({error: "Error al agregar una nueva empresa"});
});

router.put('/upd/:id', async (req, res) => {
    const { id } = req.params;
    const {
        nombre = "-----------NotReceived-----------", 
        status = "-----------NotReceived-----------", 
        observacion = "",
        codigo = ""
    } = req.body;
    const updateEmpresa: IEmpresa = {
        codigo,
        nombre,
        status,
        observacion
    };
    if(nombre==="-----------NotReceived-----------" ||
    status==="-----------NotReceived-----------"){
        return res.status(403).json({"error":"Debe venir el nombre y status correctos"})
    }

    if(await empresasModel.update(id, updateEmpresa)){
        res.status(200).json({updated: true});
    }
    return res.status(404).json({error: "Error al actualizar la empresa"});
});

router.delete('/del/:id', async (req, res) => {
    const { id } = req.params;
    if(await empresasModel.delete(id)){
        return res.status(200).json({deleted: true});
    }
    return res.status(404).json({error: "Error al eliminar la empresa"});
});

export default router;