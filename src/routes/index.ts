import express from 'express';
const router  = express.Router();

import empresasRouter from './empresas/empresas';
import usuariosRouter from './usuarios/usuarios';
import fodaRouter from './foda/foda';


router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
});

router.use('/empresas', empresasRouter);
router.use('/usuarios', usuariosRouter);
router.use('/foda', fodaRouter);

export default router;