const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo,
        actualizarImagen,
        mostrarImagen,
        actualizarImagenCloudinary
} = require('../controllers/uploads');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/:id',[
    check('id', 'El id debe de ser de mongo').isMongoId(),
    validarCampos
], mostrarImagen);

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:id', [
    validarArchivoSubir,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    validarCampos
], actualizarImagenCloudinary/* actualizarImagen */);


module.exports = router;