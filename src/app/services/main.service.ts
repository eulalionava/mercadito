import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public url:string;

  constructor(
    private _http:HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  getCodigo(codigo,token){
    let headers = new HttpHeaders();
    headers=headers.set('Content-Type','application/json');
    headers=headers.set('token',token);

    return this._http.get(this.url + 'getCodigo/'+codigo+'',{headers:headers});

  }

  insertPublicacion(files:Array<File>,publicacion:any){
    
    const formData = new FormData();

    for(var i=0; i < files.length; i++){
      formData.append('archivo',files[i],files[i].name);
      formData.append('user_id',publicacion.user_id);
      formData.append('codigo_id',publicacion.codigo_id);
      formData.append('publicacion',publicacion.publicacion);
      formData.append('imagen',publicacion.imagen);
      formData.append('activo',publicacion.activo);
    }

    return this._http.post(this.url + 'publicacion',formData);

  }

  //Todas las publicaciones
  getPublicaciones(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    
    return this._http.get( this.url + 'getAllPublicaciones',{headers:headers});
  }

  //Comentarios por publicacion
  getComentarios(publicacionID){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    
    return this._http.get( this.url + 'getComentarios/'+publicacionID+'',{headers:headers});

  }

  //Usuario de la publicacion
  getUsuarios(usuarioID){

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    
    return this._http.get( this.url + 'getUsuario/'+usuarioID+'',{headers:headers});

  }

  //Comentario a una publicacion
  insertComentario(datos){
    let params = JSON.stringify({datos:datos})
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    
    return this._http.post( this.url + 'comentario',params,{headers:headers});

  }

  // SERVICIO QUE OBTIENE TODOS LAS IMAGENES CARGADAS
  // getImagen(){
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type','application/json');
    
  //   return this._http.get( this.url + 'getImagenes',{headers:headers});

  // }

//   updateImg(datos:any,token:any){
//     let params = JSON.stringify({datos:datos,token:token});

//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type','application/json');
//     headers = headers.set('token',token.token);
    
//     return this._http.post(this.url + 'updateImage',params,{headers:headers});

//   }




}