import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';



import { Publicacion } from '../../models/publicacion';
import { Comentario } from '../../models/comentario';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  public publicaciones:any;
  public publications:any
  public comentarios:any
  public publicacion:Publicacion
  public comentario:Comentario
  public users:any
  public imagenDePerfil
  public id_usuario

  constructor(
    private _serviceMain:MainService
  ) { 
    this.publicacion = new Publicacion(1,1,1,'','','S')
    this.comentario = new Comentario(1,0,0,'','S')

    this.users = JSON.parse(localStorage.getItem('sesion'));
    this.imagenDePerfil = this.users.usuarioDB.user_imagen
    this.id_usuario = this.users.usuarioDB.user_id

  }

  ngOnInit(): void {
    this.getPublicaciones();
    // this.getComentarios();
  }


  //capturar datos de imagen de publicacion 
  public filesPublicaUpload:Array<File>;
  fileChangePublica(filePublica:any){
    this.filesPublicaUpload = <Array<File>>filePublica.target.files;
  }

  //Realizar una publicacion
  publicar(form){
 
    let token = this.users.token;

    if(this.filesPublicaUpload){
      let codigo = prompt("Escribe tu codigo");

      //Busca el codigo
      this._serviceMain.getCodigo(codigo,token).subscribe(
        response=>{
          if(response['ok']){
            this.publicacion.user_id =this.users.usuarioDB.user_id;
            this.publicacion.codigo_id = response['data']['codigo_id'];

            //Inserta publicacion
            this._serviceMain.insertPublicacion(this.filesPublicaUpload,this.publicacion).subscribe(
              response=>{
                form.reset();
                this.getPublicaciones();
              },
              error=>{

              }
            )

          }else{
            alert(response['message']);
          }
        },
        error=>{
          console.log(<any>error);
        }
        
      ) 
    }else{
      console.log('no selecciono nunguna imagen');
    }
  }

  //Obtener todas las publicaciones
  getPublicaciones(){
    const arreglo = [];
    //publicaciones
    this._serviceMain.getPublicaciones().subscribe(
      response=>{
        this.publicaciones = response['publicaciones'];

        for(let i=0;i < this.publicaciones.length;i++){
          //Comentarios por publicacion
          this._serviceMain.getComentarios(this.publicaciones[i].id).subscribe(
            response=>{
              console.log(response);
              //Usuario por publicaciones
              this._serviceMain.getUsuarios(this.publicaciones[i].user_id).subscribe(
                respuesta=>{
                  arreglo.push({
                    publicaciones:this.publicaciones[i],
                    comentarios:response['data'],
                    usuario:respuesta['data']
                  });

                }
              )
            }
          )
        }
        this.publications =  arreglo
        // console.log(this.publications);

      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //Realizar comentarios
  realizarcomentario(idPub){
    this.comentario.usuario_id = this.users.usuarioDB.user_id
    this.comentario.publicacion_id = idPub

    this._serviceMain.insertComentario(this.comentario).subscribe(
      response=>{
        this.comentario.comentario = '';
        // this.getPublicaciones();
      },
      error=>{
        console.log(<any>error);
      }
    )


  }

  //Obtener todas las publicaciones
  // getComentarios(){
  //   this._serviceMain.getComentarios().subscribe(
  //     response=>{
  //       this.comentarios = response['comentarios'];
  //       console.log(this.comentarios);
  //     },
  //     error=>{
  //       console.log(<any>error);
  //     }
  //   )
  // }


}
