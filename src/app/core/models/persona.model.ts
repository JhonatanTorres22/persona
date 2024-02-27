export class DataPersona{
    constructor(
       public data: ListarPersona,
       public isSuccess: boolean,
       public message: string,
    ){}
}

export class ListarPersona {
    constructor(
        public idPersona:number,
        public nombres:string,
        public apellidoPaterno:string,
        public apellidoMaterno:string,
        public nDocumento: number,
        public telFijo: number,
        public telCelular: number,
        public correoElectronico: string,
        public nombreUsuario:string,
        public contrasenia: string,
    ){}
}

export class AgregarPersona {
    constructor(
      public nombres:string,
      public apellidoPaterno:string,
      public apellidoMaterno:string,
      public nDocumento: number,
      public telFijo: number,
      public telCelular: number,
      public correoElectronico: string,
      public nombreUsuario:string,
      public contrasenia: string,
      public usuarioCreacion: 1,
    ){}
}

export class EditarPersona {
    constructor(
       public idPersona:number,
       public nombres:string,
       public apellidoPaterno:string,
       public apellidoMaterno:string,
       public nDocumento: string,
       public telFijo: number,
       public telCelular: number,
       public correoElectronico: string,
       public nombreUsuario:string,
        public usuarioModificacion: 1,
    ){}
}

export class EliminarPersona {
    constructor(
        public idPersona: number,
        public usuarioModificacion: 1,
    ){}
}