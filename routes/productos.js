import { Router } from "express"
import { check } from "express-validator"

import { validarCampos } from "../middlewares/validar-campos.js";

import { actualizarProducto, 
         borrarProducto, 
         crearProducto, 
         obtenerProducto, 
         obtenerProductos } from "../controllers/productos.js";

import { validarJWT } from "../middlewares/validar-jwt.js";
import { existeCategoriaPorId, existeProductoPorId } from "../helpers/db-validators.js";
import { esAdminRole } from "../middlewares/validar-roles.js";


const routerProductos = Router();

// Obtener productos
routerProductos.get('/', obtenerProductos)

//Obtener producto 
routerProductos.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto)

// Crear producto
routerProductos.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto )

// Actualizar producto
routerProductos.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto)

routerProductos.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto)

export {
    routerProductos
}