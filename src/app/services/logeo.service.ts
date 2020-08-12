import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
    providedIn:'root'
})

export class LoginService {
    public url:string;
    constructor(
        private _http:HttpClient
    ) {
        this.url = GLOBAL.url
    }

    login(datos:any){
        let params = JSON.stringify({datos:datos})
        let headers = new HttpHeaders();
        headers=headers.set('Content-Type','application/json');

        return this._http.post(this.url + 'getLogin',params,{headers:headers});
    }
}