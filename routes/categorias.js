
import { Router } from "express"
import { check } from "express-validator"

import { esAdminRole, validarCampos, validarJWT } from "../middlewares/index.js";
import { actualizarCategoria, 
         borrarCategoria, 
         crearCategoria, 
         obtenerCategoria, 
         obtenerCategorias } from "../controllers/categorias.js";
import { existeCategoriaPorId } from "../helpers/db-validators.js";


const routerCategories = Router();

// Obtener todas las categorias publico
routerCategories.get('/', obtenerCategorias )

// Obtener una categoria por id - publico 
routerCategories.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria)

// Crear una categoria - privado - cualquier persona con un token valido
routerCategories.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],  crearCategoria)

//  Actualizar alguna categoria - privado - cualquier persona con un token valido 
routerCategories.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria)

// Borrar una categoria - ADMIN
routerCategories.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria)


export {
    routerCategories
}