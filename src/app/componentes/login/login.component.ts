import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { LoginService } from '../../services/logeo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
  public usuario:Usuario

    constructor(
      private _serviceLogin:LoginService,
      private _router:Router
    ) { 
      this.usuario = new Usuario(1,'','','','','','','','','','','','U')
  }

  ngOnInit(): void {
  }

  iniciando(form){
    this._serviceLogin.login(this.usuario).subscribe(
      response=>{
        localStorage.setItem('sesion',JSON.stringify(response['usuario']));
        if(response['ok']){
          this._router.navigate(['main'])
        }else{
          form.reset();
          alert(response['message']);
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
