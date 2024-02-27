import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, retry } from 'rxjs';
import { AgregarPersona, DataPersona, EditarPersona, EliminarPersona, ListarPersona } from '../../core/models/persona.model';
import { environment } from 'src/environments/environment';
// import { AgregarPersonaDTO, ListarPersonDTO } from 'src/app/arquitectura/dto-persona/persona.dto';
import { PersonaMapper } from '../../core/mappers/persona.mapper';
import { AgregarPersonaDTO } from '../dto-persona/persona.dto';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private urlEnviro:string;
  private urlListarPersona:string;
  private urlAgregarPersona:string;
  private urlEditarPersona: string;
  private urlEliminarPersona: string;

  constructor( private httpClient:HttpClient ) { 
    this.urlEnviro = environment.EndPoint;
    this.urlListarPersona = 'api/Persona/Listar';
    this.urlAgregarPersona = 'api/Persona/Insertar';
    this.urlEditarPersona = 'api/Persona/Actualizar',
    this.urlEliminarPersona = 'api/Persona/Eliminar';
  }

  listarPersona(): Observable<ListarPersona[]> {
    return this.httpClient.get<any>(this.urlEnviro + this.urlListarPersona).pipe(
      map((response) => {
        if (response && response.isSuccess && response.data) {
          return response.data.map(PersonaMapper.listarFromApiToDomain);
        } else {
          console.log('La respuesta del servicio no tiene la estructura esperada:', response.data);
          return [];
        }
      })
    );
  }

  agregarPersona( agregarPersona:AgregarPersona):Observable<AgregarPersona>{
    let apiPersona = PersonaMapper.agregarDomainToApi(agregarPersona);
    return this.httpClient.post<AgregarPersonaDTO>(this.urlEnviro + this.urlAgregarPersona, agregarPersona).pipe(map(PersonaMapper.agregarFromApiToDomain))
  }

  editarPersona(editarPersona : EditarPersona) : Observable<EditarPersona> {
    return this.httpClient.put<EditarPersona>(this.urlEnviro + this.urlEditarPersona, editarPersona);
  }

  eliminarPersona(idPersona:number, usuarioModificacion: 1): Observable<EliminarPersona>{
    const requestBody:EliminarPersona = {idPersona, usuarioModificacion}
    return this.httpClient.delete<EliminarPersona>(this.urlEnviro+this.urlEliminarPersona,  {body:requestBody})
  }
}
