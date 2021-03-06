import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
    providedIn:'root'
})

export class PublicidadService {
    public url:string;

    constructor(
        private _http:HttpClient
    ) {
        this.url = GLOBAL.url
    }

    //REGISTRAR UNA NUEVA PUBLICIDAD
    registrarPublicidad(files:Array<File>,publicidad:any){
        const formData = new FormData();

        for( let i=0; i<files.length; i++){
            formData.append('archivo',files[i],files[i].name);
        }
        
        formData.append('publicidad',publicidad.publicidad);
        formData.append('activo',publicidad.activo);

        return this._http.post(this.url + 'publicidad',formData);
    }

    allPublicidad(){
        let headers = new HttpHeaders();
        headers=headers.set('Content-Type','application/json');

        return this._http.get(this.url + 'publicidades',{headers:headers});

    }

}