import jwt from "jsonwebtoken"
import { response, request } from "express"

import { Usuario } from "../models/usuario.js";

const validarJWT = async( req = request, res = response, next) => {

    const token = req.header( 'x-token' );
   
    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETOPRIVATEKEY );

        // Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid )
        
        if ( !usuario ) {
            return res.status( 400 ).json({
                msg: 'Token no valido - Usuario no encontrado'
            })
        }

        // Verificar si el usuario esta activo (estado: true)
        if ( !usuario.estado ) {
            return res.status( 401 ).json({
                msg: 'El usuario no esta activo'
            })
        }


        // req.uid = uid
        req.usuario = usuario
        next();

    } catch ( error ) {

        console.log( error )
        return res.status( 401 ).json({
            msg: 'Token no valido'
        })

    }
    
}

export {
    validarJWT
}

