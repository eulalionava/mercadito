import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public imagenDePerfil
  public user

  constructor() { 
    this.user = JSON.parse(localStorage.getItem('sesion'))
    this.imagenDePerfil = this.user.usuarioDB.user_imagen
  }

  ngOnInit(): void {
  }

}
