import { request, response } from "express";
import { Categoria } from "../models/index.js"

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async ( req = request, res = response) => {

    const { limite = 5 } = req.query;
    const query = { estado: true }

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
                 .populate('usuario', 'nombre')
                 .limit( Number( limite ) )
    ])

    res.json({
        total,
        categorias
    })
}

// obtenerCategoria - populate
const obtenerCategoria = async ( req = request, res = response ) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id )
                                     .populate('usuario', 'nombre');

    res.status(200).json(
        categoria
    )
}

const crearCategoria = async ( req = request, res= response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre })

    if( categoriaDB ) {
        return res.status( 400 ).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        })
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    await categoria.save();

    res.status( 201 ).json( categoria )

}

// actualizarCategoria
const actualizarCategoria = async( req = request, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true } );

    res.json( categoria )

}

// borrarCategoria - estado:false
const borrarCategoria = async( req = request, res = response ) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } )

    res.json( categoria )
}

export {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}