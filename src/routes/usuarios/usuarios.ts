import express from 'express';
const router = express.Router();

import {IUsuario, Usuarios} from '@libs/Usuarios/Usuarios';

const usuariosModel = new Usuarios();

usuariosModel.add({
    codigo: '',
    correo: 'testing@test.com',
    nombre: 'test',
    password: 'sdsd',
    roles: [
        'admin',
        'user'
    ]
});

router.get('/', (_req, res) => {
    const jsonUrls = {
        "getAll": {"method:": "GET", "url": "usuarios/all"},
        "getById": {"method:": "GET", "url": "usuarios/byid/:id"},
        "new": {"method:": "POST", "url": "usuarios/new"},
        "update": {"method:": "PUT", "url": "usuarios/upd/:id"},
        "delete": {"method:": "DELETE", "url": "usuarios/del/:id"}
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', (_req, res) => {
    res.status(200).json(usuariosModel.getAll());
});


router.get('/byid/:id', (req, res) => {
    const { id } = req.params;
    const usuario = usuariosModel.getById(id);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({error: "No se encontró el usuario"});
});

router.post('/new', (req, res) => {
    const {
        correo = "johndoe@test.com",
        nombre = "John Doe",
        password = "johndoe123",
        roles = [
            "guest"
        ]
    } = req.body;
    const newUsuario: IUsuario = {
        codigo: "",
        correo,
        nombre,
        password,
        roles
    }
    if(usuariosModel.add(newUsuario)){
        return res.status(200).json({created: true});
    }
    return res.status(404).json({error: "Error al agregar un nuevo usuario"});
})

router.put('/upd/:id', (req, res) => {
    const { id } = req.params;
    const {
        correo,
        nombre,
        password,
        roles
    } = req.body;
    const updateUsuario: IUsuario = {
        codigo: id,
        correo,
        nombre,
        password,
        roles
    }
    if(usuariosModel.update(updateUsuario)){
        return res.status(200).json({updated: true});
    }
    return res.status(404).json({error: "Error al actualizar el usuario"});
});


router.delete('/del/:id', (req, res) => {
    const { id : codigo } = req.params;
    if(usuariosModel.delete(codigo)){
        return res.status(200).json({deleted: true});
    }
    return res.status(404).json({error: "Error al eliminar el usuario"});
});
export default router;