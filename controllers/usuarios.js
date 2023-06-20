import { response, request } from "express"

const usuarioGet = (req = request, res = response ) => {
    
    const query = req.query;

    res.json({
        ok: true,
        msg: "get API - Controlador",
        query
    })
}

const usuarioPost = (req, res = response ) => {
    
    // LImpiar para no dejar inyectar código malicioso
    const { nombre, edad } = req.body;
;
    res.json({
        ok: true,
        msg: "Post API - Controlador",
        nombre,
        edad
    })
}

const usuarioPatch = (req, res = response ) => {
    
    res.json({
        ok: true,
        msg: "Patch API - Controlador"
    })
}

const usuarioDelete = (req, res = response ) => {
    
    res.json({
        ok: true,
        msg: "Delete API - Controlador"
    })
}

const usuarioPut = (req, res = response ) => {
    
    const { id } = req.params;

    res.json({
        ok: true,
        msg: "Put API - Controlador",
        id
    })
}


export {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioPatch,
    usuarioDelete
}

