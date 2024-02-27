import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaRoutingModule } from './persona-routing.module';
import { ListarPersonaComponent } from './listar-persona/listar-persona.component';
import { AddEditPersonaComponent } from './add-edit-persona/add-edit-persona.component';


@NgModule({
  declarations: [
    ListarPersonaComponent,
    AddEditPersonaComponent
  ],
  imports: [
    CommonModule,
    PersonaRoutingModule,
  ],
  exports : [
    ListarPersonaComponent
  ]
})
export class PersonaModule { }
