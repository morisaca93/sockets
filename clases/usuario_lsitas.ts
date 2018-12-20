import {Usuario} from './usuario';


export class UsuarioLista{
    private lista:Usuario[] = [];
    constructor(){}
    public agregar(usuario:Usuario){
        this.lista.push(usuario);
        console.log("UsuarioLista[agregar] usuario agrgeadoo");
        console.log("UsuarioLista[agregar] Nueva lsita de usuarios",this.lista);

    }
    public getLista(){
        return this.lista;
    }
    public antualizarNombre(id:string, nombre:string){
        for(let usuario of this.lista){
            if(usuario.id === id){
                console.log("UsuarioLista[actualizarNombre] modificando de:", usuario.nombre);
                usuario.nombre = nombre;
                console.log("UsuarioLista[actualziarNombre] a", usuario.nombre);
                break;
                
            }
        }
        console.log("UsuarioLista[actualizarNombre] Nueva lista de usuarios =>",this.lista);
    }
    public getUsuario(id:string){
        for(let usuario of this.lista){
            if(usuario.id==id){
                return usuario;
            }
        }
        console.log("UsuarioLista[getUsuario] No se encontro al usuario con ID:=>",id);
    }
    public borrarUsuario(id:string){
        this.lista = this.lista.filter((usuario)=>{
            if(usuario.id !==id){
                return usuario;
            }
        });
        console.log("UsuarioLista[borrarUsuario] usuario borrado");
        console.log("UsuarioLista[borrarUsuario] Nueva lsita de usuarios",this.lista);

    }
}