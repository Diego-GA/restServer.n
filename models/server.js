import express from "express"
import cors from "cors"
import { router } from "../routes/usuarios.js"

import { dbConnection } from "../database/config.js"

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/usuarios'

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

        this.app.use( this.userPath , router )
        
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