import { response, request } from "express"
import { Usuario } from "../models/usuario.js";
import bcryptjs from "bcryptjs"

const usuarioGet = async(req = request, res = response ) => {
    
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    // const usuarios = await Usuario.find( query )
    //                               .skip(  Number( desde ) )
    //                               .limit( Number( limite ) )

    // const total = await Usuario.countDocuments( query );

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
               .skip(  Number( desde ) )
               .limit( Number( limite ) )
    ])

    res.json({
        total,
        usuarios
    })
}

const usuarioPost = async(req, res = response ) => {


    // LImpiar para no dejar inyectar código malicioso
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );    

    // Encryptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync( password, salt )

    // Guardar en la base de datos
    await usuario.save()

    res.json({
        usuario
    })
}

const usuarioPatch = (req, res = response ) => {
    
    res.json({
        ok: true,
        msg: "Patch API - Controlador"
    })
}

const usuarioDelete = async(req, res = response ) => {
    
    const { id } = req.params;

    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } )

    res.json( usuario )
}

const usuarioPut = async(req, res = response ) => {
    
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json( usuario )
}


export {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioPatch,
    usuarioDelete
}

