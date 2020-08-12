import { Component, OnInit } from '@angular/core';
import {PublicidadService } from '../../services/publicidad.service';
import { Publicidad } from '../../models/publicidad';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  providers:[PublicidadService]
})
export class PublicidadComponent implements OnInit {

  public publicidad:Publicidad

  constructor(
    private _servicePublicidad:PublicidadService
  ) {
    this.publicidad = new Publicidad(1,'','','S')
  }

  ngOnInit(): void {
  }

//capturar datos de imagen de publicacion 
  public filesPublidadUpload:Array<File>;
  fileChangePublicidad(filePublicidad:any){
    this.filesPublidadUpload = <Array<File>>filePublicidad.target.files;
  }

  agregarPublicidad(form){
    this._servicePublicidad.registrarPublicidad(this.filesPublidadUpload,this.publicidad).subscribe(
      response=>{
        console.log(response);
        form.reset();
      },
      error=>{
        console.log(<any>error);
      }
    )
  }


}
