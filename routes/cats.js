const { Router } = require('express');
const { check } = require('express-validator');

const { catsGet,
        catsPost,
        catsPut,
        catsDelete
} = require('../controllers/cats');
/* const { existeCatPorId } = require('../helpers/db-validator'); */
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', catsGet);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    /* check('id').custom(existeCatPorId), */
    check('genero', 'No es un genero valido').isIn(["macho", "hembra"]),
    validarCampos
] ,catsPut);

router.post('/', [
    check('nombre', 'Ingrese algún nombre').not().isEmpty(),
    check('nombre', 'El nombre del gato no es un string').isString(),
    check('edad', 'Ingrese alguna edad').not().isEmpty(),
    check('edad', 'La edad no es un numero').isNumeric(),
    check('genero', 'No es un genero valido').isIn(["macho", "hembra"]),
    validarCampos
], catsPost);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], catsDelete);



/* router.post('/', catsPost()); */

module.exports = router;