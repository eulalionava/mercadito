import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  providers:[RegistroService]
})
export class RegistroComponent implements OnInit {
  public usuario:Usuario;

  constructor(
    private _serviceResgistro:RegistroService,
    private _router:Router
  ) {
    this.usuario = new Usuario(1,'','','','','','','','','','','','U');
   }

  ngOnInit(): void {
  }

  registrar_usuario(){
    this._serviceResgistro.registrar(this.usuario).subscribe(
      response=>{
        console.log(response);
        if(response['ok']){
          this._router.navigate(['/login']);
        }else{
          alert(response['message']);
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
