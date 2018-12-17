//importando libreria exprees
import express from 'express';
import {SERVER_PORT} from '../globals/environment';
import http from 'http';
import SocketIO from 'socket.io';

export default class Server{
    public app:express.Application;
    public port:Number;
    private httpServer:http.Server;
    public io:SocketIO.Server;

    //constructor del server
    constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        //configurando el nuevo servido web a travez de http
        this.httpServer = new http.Server(this.app);
        this.io = SocketIO(this.httpServer);
        this.escuchasSockets();
    }
    //funcion para escuchar las conexiones
    public escuchasSockets(){
        console.log('Listo para escuchar conexiones o sockets');
        //el servidorescucha 
        this.io.on('connect',cliente=>{
            console.log('nuevo cliente conectando');
            //el cliente qeu se ha conectado previamente, escucha su desconexion
            cliente.on('disconnect',()=>{
                console.log('el cliente se ha desconectado');
            });
            //El cliente que se ha conectado previamente, escucha un evento de nombre:'mensaje'
        cliente.on('mensaje',(contenido)=>{
                console.log('entrada',contenido);
                this.io.emit('mensaje-nuevo',contenido);
            })
        });
    }

    //funcion para iniciar el servidor
    public start(callback:Function){
        this.httpServer.listen(this.port,callback);
    }
}
