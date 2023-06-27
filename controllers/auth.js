import { request, response } from "express";
import bcryptjs from "bcryptjs"

import { Usuario } from "../models/usuario.js"
import { generarJWT } from "../helpers/generar-jwt.js";

const login = async( req = request, res = response ) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo })
        if ( !usuario ) {
            return res.status( 400 ).json({
                msg: 'Usuario / Password no son correctos - email'
            })
        }

        // Si el usuario esta activo
        if( !usuario.estado ) {
            return res.status( 400 ).json({
                msg: 'Usuario / Password no son correctos - estado de baja'
            })
        }

        // VErificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password )
        if( !validPassword ) {
            return res.status( 400 ).json({
                msg: 'Usuario / Password no son correctos - contraseña incorrecta'
            })
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id )

        res.json({
            usuario,
            token
        })

    } catch ( error ) {
        console.log( error )
        res.status( 500 ).json({
            msg: "Algo salio mal",
        });
    }


}


export {
    login
}