import { Router } from "express";
import {    usuarioDelete, 
            usuarioGet, 
            usuarioPatch, 
            usuarioPost, 
            usuarioPut } 
            from "../controllers/usuarios.js";

const router = Router()

router.get('/',     usuarioGet )

router.put('/:id',     usuarioPut)

router.post('/',    usuarioPost)

router.delete('/',  usuarioDelete)

router.patch('/',   usuarioPatch)


export {
    router
}