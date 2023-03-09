import express from 'express';
import { MongoDBConn } from '@dao/MongoDBConn';
import { Usuarios } from '@libs/Usuarios/Usuarios';
import { UsuariosDao } from '@dao/models/Usuarios/UsuariosDao';


const usuariosDao = new UsuariosDao(MongoDBConn);
let usuariosModel: Usuarios;

usuariosDao.init().then(()=>{
    usuariosModel = new Usuarios(usuariosDao);
});

const router = express.Router();

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

router.get('/all', async (_req, res) => {
    res.status(200).json(await usuariosModel.getAll());
});
router.post('/new', async (req, res) => {
    const  newUser = req.body;
    const result = await usuariosModel.newUser(newUser);
    return res.status(200).json(result);
})
router.put('/upd/:id', async (req, res) => {
    const { id } = req.params;
    const uptUser = req.body;
    const result = await usuariosModel.updateUser(id, uptUser);
    return res.status(200).json(result);
});
router.delete('/del/:id', async (req, res) => {
    const { id } = req.params;
    const result = await usuariosModel.deleteUser(id);
    return res.status(200).json(result);
});
router.put('/upd/:id/ultimoacceso', async (req, res) => {
    const { id } = req.params;
    const ultimoacceso = new Date();
    const result = await usuariosModel.setUltimoAcceso(id, ultimoacceso);
    return res.status(200).json(result);
});
export default router;