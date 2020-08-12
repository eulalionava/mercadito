import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
    providedIn:'root'
})

export class RegistroService {
    public url:string;

    constructor(
        private _http:HttpClient
    ) {
        this.url = GLOBAL.url
    }

    registrar(registro:any){
        let params = JSON.stringify({datos:registro})
        let headers = new HttpHeaders();
        headers=headers.set('Content-Type','application/json');

        return this._http.post(this.url + 'registro',params,{headers:headers});
    }
}