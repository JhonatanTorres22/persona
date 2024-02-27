import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ListarPersona } from 'src/app/core/models/persona.model';
import { PersonaService } from 'src/app/infraestructura/services/persona.service';

@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrls: ['./listar-persona.component.scss']
})
export class ListarPersonaComponent implements OnInit {

  displayedColumns: string[] = ['nombres', 'apellidoPaterno', 'apellidoMaterno', 'nDocumento', 'correoElectronico', 'acciones']
  listaDePersona!:ListarPersona;
  listarPersona: MatTableDataSource<ListarPersona>;

  constructor(
    private personaService:PersonaService,
     private dialog: MatDialog
  ){
    this.listarPersona = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.listaPersona()
  }

  listaPersona(){
    this.personaService.listarPersona().subscribe({
      next: (persona:ListarPersona[] ) => {
        this.listarPersona.data = persona;
        console.log(this.listarPersona.data, '***');
      }
    })
  }

  abrirModalAddEditPersona(persona: ListarPersona, tipo: number){

  }

  eliminarPersona(persona:ListarPersona){

  }
}
