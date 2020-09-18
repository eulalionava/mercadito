import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MainService } from '../../services/main.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[MainService]
})
export class HeaderComponent implements OnInit {
  public imagenDePerfil
  public user

  constructor(
    private _router:Router,
    public _service:MainService
  ) { 
    this.user = JSON.parse(localStorage.getItem('sesion'))
    this.imagenDePerfil = this.user.usuarioDB.user_imagen
  }

  ngOnInit(): void {
  }

  closeSesion(){
    localStorage.removeItem('sesion');
    this._router.navigate(['/login']);
  }

}
