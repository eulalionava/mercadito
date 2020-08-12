export class Usuario{
    constructor(
        public id:number,
        public nombre:string,
        public apellidos:string,
        public edad:string,
        public comunidad:string,
        public nacimiento:string,
        public telefono:string,
        public correo:string,
        public usuario:string,
        public password:string,
        public repetir:string,
        public tipo:string
    ){}
}