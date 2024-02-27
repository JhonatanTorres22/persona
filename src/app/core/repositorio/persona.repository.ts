import { Observable } from "rxjs";
import { AgregarPersona, EditarPersona, EliminarPersona, ListarPersona } from "../models/persona.model";

export abstract class PersonaRepository {
    abstract listarPersona(): Observable<ListarPersona[]>;
    abstract agregarPersona(agregarPersona: AgregarPersona):Observable<AgregarPersona>;
    abstract editarPersona(editarPersona: EditarPersona): Observable<EditarPersona>;
    abstract eliminarPersona(idPersona:number, usuarioModificacion:1): Observable<EliminarPersona>
}