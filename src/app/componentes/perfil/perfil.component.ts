import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { Usuario } from '../../models/usuario';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
  public usuario:Usuario
  public miperfil:any;
  public activarEdicion:any

  constructor(
    private _route:ActivatedRoute,
    private _servicePerfil:PerfilService,
    private _router:Router
  ) { 
    this.usuario = new Usuario(1,'','','','','','','','','','','')
    this.miperfil = false
    this.activarEdicion = false
  }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(){
    let usuarioSesion = JSON.parse(localStorage.getItem('sesion'));
    let id = this._route.snapshot.paramMap.get('idUser');
    
    this._servicePerfil.getUsuario(id).subscribe(
      response=>{
        this.usuario.nombre     = response['data']['user_nombre'];
        this.usuario.apellidos  = response['data']['user_apellidos'];
        this.usuario.edad       = response['data']['user_edad'];
        this.usuario.telefono   = response['data']['user_telefono'];
        this.usuario.nacimiento = response['data']['user_fechaNacimiento'];
        this.usuario.comunidad  = response['data']['user_comunidad'];
        this.usuario.correo     = response['data']['user_correo'];

        //Verifica si usuario del perfil pertenece a la sesion
        if(usuarioSesion.usuarioDB.user_id === response['data']['user_id']){
          this.miperfil = true;
        }

      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  activar_edicion(){
    this.activarEdicion = true
  }
  
  editarPerfi(){
    let id_usuario = this._route.snapshot.paramMap.get('idUser');

    this._servicePerfil.updatePerfil(id_usuario,this.usuario).subscribe(
      response=>{
        if(response['ok']){
          this.activarEdicion = false
          this.getUsuario();
        }else{
          alert(response['message']);
        }
      },
      error=>{
        console.log(<any>error);
      }
    )

  }

  //capturar datos de imagen de publicacion 
  public filesPerfilUpload:Array<File>;
  foto_perfil(filePerfil:any){
    this.filesPerfilUpload = <Array<File>>filePerfil.target.files;
  }

  cambiarPerfil(){
    this._servicePerfil.updateFotoPerfil(this.filesPerfilUpload).subscribe(
      response=>{
        console.log(response);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
