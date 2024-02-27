import { AgregarPersonaDTO, ListarPersonDTO } from "src/app/arquitectura/dto-persona/persona.dto";
import { AgregarPersona, ListarPersona } from "../models/persona.model";

export class PersonaMapper {

    //para listar
    static listarFromApiToDomain(apiListarPersona:ListarPersonDTO):ListarPersona{
        return{
            idPersona: apiListarPersona.idPersona,
            nombres: apiListarPersona.nombres,
            apellidoPaterno: apiListarPersona.apellidoPaterno,
            apellidoMaterno: apiListarPersona.apellidoMaterno,
            nDocumento: apiListarPersona.nDocumento,
            telFijo: apiListarPersona.telFijo,
            telCelular: apiListarPersona.telCelular,
            correoElectronico: apiListarPersona.correoElectronico,
            nombreUsuario: apiListarPersona.nombreUsuario,
            contrasenia:apiListarPersona.contrasenia
        }
    }

    static listarDomainToApi(apiListarPersona:ListarPersona): ListarPersonDTO{
        return{
            idPersona: apiListarPersona.idPersona,
            nombres: apiListarPersona.nombres,
            apellidoPaterno: apiListarPersona.apellidoPaterno,
            apellidoMaterno: apiListarPersona.apellidoMaterno,
            nDocumento: apiListarPersona.nDocumento,
            telFijo: apiListarPersona.telFijo,
            telCelular: apiListarPersona.telCelular,
            correoElectronico: apiListarPersona.correoElectronico,
            nombreUsuario: apiListarPersona.nombreUsuario,
            contrasenia:apiListarPersona.contrasenia 
        }
    }

    //para agregar 
    static agregarFromApiToDomain(apiAgregarPersona:AgregarPersonaDTO): AgregarPersona{
        return {
            nombres: apiAgregarPersona.nombres,
            apellidoPaterno: apiAgregarPersona.apellidoPaterno,
            apellidoMaterno: apiAgregarPersona.apellidoMaterno,
            nDocumento: apiAgregarPersona.nDocumento,
            telFijo: apiAgregarPersona.telFijo,
            telCelular: apiAgregarPersona.telCelular,
            correoElectronico: apiAgregarPersona.correoElectronico,
            nombreUsuario: apiAgregarPersona.nombreUsuario,
            contrasenia: apiAgregarPersona.contrasenia,
            usuarioCreacion: apiAgregarPersona.usuarioCreacion
        }
    }

    static agregarDomainToApi(apiAgregarPersona:AgregarPersona): AgregarPersonaDTO{
        return{
            nombres: apiAgregarPersona.nombres,
            apellidoPaterno: apiAgregarPersona.apellidoPaterno,
            apellidoMaterno: apiAgregarPersona.apellidoMaterno,
            nDocumento: apiAgregarPersona.nDocumento,
            telFijo: apiAgregarPersona.telFijo,
            telCelular: apiAgregarPersona.telCelular,
            correoElectronico: apiAgregarPersona.correoElectronico,
            nombreUsuario: apiAgregarPersona.nombreUsuario,
            contrasenia: apiAgregarPersona.contrasenia,
            usuarioCreacion: apiAgregarPersona.usuarioCreacion
        }
    }
}