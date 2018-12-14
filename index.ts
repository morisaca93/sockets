import Server from './clases/server'; //si hay mas clases por defecto se pone default server.ts
import boddyParser from 'body-parser';
import cors from 'cors';
import {router} from './routes/router';
//instanciando al servidor
const server = new Server();
//Configurando bodyparser para que los argumentos que lleguen por urlencoded
//lleguen en el arreglo 'body' del request

server.app.use(boddyParser.urlencoded({extended:true}));
server.app.use(boddyParser.json());

//CORS
server.app.use(cors({origin:true, credentials:true}));

//CONFIGURANDO LAS RUTAS
server.app.use('/',router);
//INICIANDO EL SERVIDOR
server.start(()=>{
    console.log(`servidor corriendo en el puerto ${server.port}`);
})