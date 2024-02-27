import { Observable } from "rxjs";
import { AgregarPersona, EditarPersona, ListarPersona } from "src/app/core/models/persona.model";
import { PersonaRepository } from "src/app/core/repositorio/persona.repository";
import { PersonaService } from "../services/persona.service";

export class AlcanceRepositoryImpl implements PersonaRepository {

    constructor( private personaService: PersonaService ){}

    listarPersona(): Observable<ListarPersona[]> {
        return this.personaService.listarPersona();
    }

    agregarPersona(agregarPersona: AgregarPersona): Observable<AgregarPersona> {
        return this.personaService.agregarPersona(agregarPersona);
    }

    editarPersona(editarPersona: EditarPersona): Observable<EditarPersona> {
        return this.personaService.editarPersona(editarPersona)
    }
}