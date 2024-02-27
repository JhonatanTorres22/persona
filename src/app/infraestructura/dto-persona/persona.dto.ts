export interface ListarPersonDTO{
    idPersona:number,
    nombres:string,
    apellidoPaterno:string,
    apellidoMaterno:string,
    nDocumento: number,
    telFijo: number,
    telCelular: number,
    correoElectronico: string,
    nombreUsuario:string,
    contrasenia: string,
}

export interface AgregarPersonaDTO{
    nombres:string;
    apellidoPaterno:string;
    apellidoMaterno:string;
    nDocumento: number;
    telFijo: number;
    telCelular:number;
    correoElectronico:string;
    nombreUsuario:string;
    contrasenia:string;
    usuarioCreacion:1
}

export interface EditarPersonaDTO{
    idPersona: number;
    nombres:string;
    apellidoPaterno:string;
    apellidoMaterno:string;
    nDocumento: number;
    telFijo: number;
    telCelular:number;
    correoElectronico:string;
    nombreUsuario:string;
    contrasenia:string;
    usuarioModificacion:1
}

export interface EliminarPersonaDTO{
    idPersona:number;
    usuarioModificacion:1
}