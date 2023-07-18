import {    Categoria, 
            Producto, 
            Role, 
            Usuario } from "../models/index.js";


const esRoleValido = async( rol = '' ) => {
    
    const existeRol = await Role.findOne({ rol });

    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no esta registrado en la base de datos`)
    }
}

const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo })
    if( existeEmail ){
        throw new Error(`El correo ${ correo } ya esta registrado`)
    }

}


const existeUsuarioPorId = async( id = '' ) => {
    const existeUsuario = await Usuario.findById( id )
    if( !existeUsuario ){
        throw new Error(`El id no existe ${ id }`)
    }

}

const existeCategoriaPorId = async ( id ) => {

    const existeCategoria = await Categoria.findById( id )
    if( !existeCategoria ){
        throw new Error(`El id no existe ${ id }`)
    }
} 

const existeProductoPorId = async ( id ) => {
    
    const  existeProducto = await Producto.findById( id )

    if( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`)
    }

}


export {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}