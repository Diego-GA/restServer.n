import express from "express"
import cors from "cors"

import { router } from "../routes/usuarios.js"
import { routerAuth } from "../routes/auth.js"
import { routerCategories } from "../routes/categorias.js"

import { dbConnection } from "../database/config.js"
import { routerProductos } from "../routes/productos.js"
import { routerBuscar } from "../routes/buscar.js"

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categories: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
        }

        // Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // Cors
        this.app.use( cors() )

        // Lectura y parseo del middleware
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );

    }

    routes() {

        this.app.use( this.paths.auth      ,   routerAuth );
        this.app.use( this.paths.buscar    ,   routerBuscar);
        this.app.use( this.paths.categories,   routerCategories );
        this.app.use( this.paths.productos ,   routerProductos);
        this.app.use( this.paths.usuarios  ,   router );
    }

    listen() {
        this.app.listen( this.port , () => {
            console.log(`Rest server en ${ this.port }`)
        })
    }

}

export {
    Server
}