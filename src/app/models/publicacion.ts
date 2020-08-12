export class Publicacion{
    constructor(
        public id:number,
        public user_id:number,
        public codigo_id:number,
        public publicacion:string,
        public imagen:string,
        public activo:string
    ){}
}
