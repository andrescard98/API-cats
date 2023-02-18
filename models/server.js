const express = require('express');
const cors = require('cors');

const {dbConnection} = require('../db/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT,

        this.paths = {
            cats: '/api/cats',
            uploads: '/api/uploads'
        }
        

        //Conectar la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }
    
    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body, recibe las req en tipo JSON
        this.app.use( express.json() );

        // Directorio Público
        this.app.use(express.static('public'));

        //Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use( this.paths.cats, require('../routes/cats'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`)
        })
    }

}

module.exports = Server;