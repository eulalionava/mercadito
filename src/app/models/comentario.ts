export class Comentario{
    constructor(
        public id:number,
        public usuario_id:number,
        public publicacion_id:number,
        public comentario:string,
        public activo:string
    ){}
}