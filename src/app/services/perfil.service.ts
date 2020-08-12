import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
    providedIn:'root'
})

export class PerfilService {
    public url:string;

    constructor(
        private _http:HttpClient
    ) {
        this.url = GLOBAL.url
    }

    getUsuario(id){
        
        let headers = new HttpHeaders();
        headers=headers.set('Content-Type','application/json');

        return this._http.get(this.url + 'getUsuario/'+id+'',{headers:headers});
    }

    updatePerfil(id_usuario,datos:any){
        let params = JSON.stringify({datos:datos})

        let headers = new HttpHeaders();
        headers=headers.set('Content-Type','application/json');

        return this._http.put(this.url + 'updatePerfil/'+id_usuario+'',params,{headers:headers});

    }

    updateFotoPerfil(foto:Array<File>){

        const formData = new FormData();

        for(let i=0; i< foto.length;i++){
            formData.append('archivo',foto[i],foto[i].name);
        }
        return this._http.post(this.url + 'cambiarfoto',formData);
    }
    
}