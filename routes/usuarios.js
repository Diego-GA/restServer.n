import { Router } from "express";
import { check } from "express-validator";

import {    usuarioDelete, 
            usuarioGet, 
            usuarioPatch, 
            usuarioPost, 
            usuarioPut } 
            from "../controllers/usuarios.js";

import { emailExiste, esRoleValido, existeUsuarioPorId } from "../helpers/db-validators.js";

import {    validarCampos,
            validarJWT, 
            esAdminRole,
            tieneRole } from '../middlewares/index.js'

const router = Router()

router.get('/',     usuarioGet )

router.put('/:id', [
    check('id', "No es un ID válido").isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
],usuarioPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de al menos de 6 letras').isLength({ min: 6 }),
    check('correo', 'Correo no valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ), 
    validarCampos
], usuarioPost)

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', "No es un ID válido").isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuarioDelete)

router.patch('/',   usuarioPatch)


export {
    router
}