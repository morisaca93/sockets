//importando libreria exprees
import express from 'express';
import {SERVER_PORT} from '../globals/environment';
import http from 'http';
import SocketIO from 'socket.io';
import { UsuarioLista } from './usuario_lsitas';
import {Usuario} from './usuario';
import { emit } from 'cluster';
//creando la clase servidor
export default class Server{
    //creando la variable del servidor express
    public app:express.Application;
    public port:Number;
    private httpServer:http.Server;
    public io:SocketIO.Server;
    public usuariosConectados = new UsuarioLista();

    //constructor del server
    constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        //configurando el nuevo servido web a travez de http
        this.httpServer = new http.Server(this.app);
        this.io = SocketIO(this.httpServer);
        this.escuchasSockets();
    }
    
    //programando getter de la unica instancia de la clase(patron de diseño singleton)
    private static _instance:Server;
    public static get instance(){
        if(this._instance){
            return this._instance;
        }else{
            this._instance = new this();
            return this._instance
        }
    }
    //funcion para escuchar las conexiones
    public escuchasSockets(){
        console.log('Listo para escuchar conexiones o sockets');
        //el servidorescucha 
        this.io.on('connect',cliente=>{
            console.log('nuevo cliente conectando', cliente.id);
            const usuario = new Usuario(cliente.id);
            this.usuariosConectados.agregar(usuario);
            
          

            //el cliente qeu se ha conectado previamente, escucha su desconexion
            cliente.on('disconnect',()=>{
                console.log('el cliente se ha desconectado');
                this.usuariosConectados.borrarUsuario(cliente.id);
                this.io.emit('usuarios-activos',this.usuariosConectados.getLista());
            });
            //El cliente que se ha conectado previamente, escucha un evento de nombre:'mensaje'
        cliente.on('mensaje',(contenido)=>{
                console.log('entrada',contenido);
                this.io.emit('mensaje-nuevo',contenido);
            });
            cliente.on('configurar-usuario',(payload:any,callback:Function)=>{
                this.usuariosConectados.antualizarNombre(cliente.id,payload.nombre);
                this.io.emit('usuarios-activos',this.usuariosConectados.getLista());
                callback({
                    ok:true,
                    mensaje:`Usuario ${payload.nombre} configurado`
                });
            });
            cliente.on('obtener-usuarios',()=>{
                this.io.in(cliente.id).emit('usuarios-activos',this.usuariosConectados.getLista());
            });
        });
    }

    //funcion para iniciar el servidor
    public start(callback:Function){
        this.httpServer.listen(this.port,callback);
    }
}
