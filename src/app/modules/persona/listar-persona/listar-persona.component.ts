import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EliminarPersona, ListarPersona } from 'src/app/core/models/persona.model';
import { PersonaService } from 'src/app/infraestructura/services/persona.service';
import { AddEditPersonaComponent } from '../add-edit-persona/add-edit-persona.component';
import Swal from 'sweetalert2';
import { ComunicacionService } from './servicio-compartido/comunicacion.service';
import { Route, Router } from '@angular/router';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrls: ['./listar-persona.component.scss']
})
export class ListarPersonaComponent implements OnInit {
  loading : boolean = false;
  // borderedCookie = 'no';
  // isBordered = false;
  // bordered$ = fromEvent(window, 'isBordered');
  displayedColumns: string[] = ['nombres', 'apellidoPaterno', 'apellidoMaterno', 'nDocumento', 'correoElectronico', 'acciones']
  listaDePersona!:ListarPersona;
  listarPersona: MatTableDataSource<ListarPersona>;

  constructor(
    private router:Router,
    private personaService:PersonaService,
     private dialog: MatDialog
  ){
    this.listarPersona = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.listaPersona();
    this.loading = true
  }

  listaPersona(){
    this.personaService.listarPersona().subscribe({
      next: (persona:ListarPersona[] ) => {
        this.loading = false
        this.listarPersona.data = persona;
        console.log(this.listarPersona.data, '***');
      }
    })
  }

  abrirModalAddEditPersona(persona: ListarPersona, tipo: number){
    const dialogRef = this.dialog.open(AddEditPersonaComponent, {
      disableClose: true,
      data: {persona:persona , tipo:tipo},
      width: '700px',
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Guardar') {
        console.log('guardando...');
        setTimeout(() => {
          this.listaPersona();
        }, 300);
      } else {
        console.log('cerrando el modal...');
        
      }
    })
  }

  eliminarPersona(persona:ListarPersona){
    Swal.fire({
      icon: 'question',
      title: '¿ELIMINAR?',
      text: `¿ESTÁ SEGURO QUE DESEA ELIMINAR A ${persona.apellidoPaterno} ${persona.apellidoMaterno} ${persona.nombres}?`,
      showCancelButton: true,
      confirmButtonText: "ELIMINAR",
      cancelButtonText: "CANCELAR",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      
    }).then((result) => {
      if(result.isConfirmed) {
        this.personaService.eliminarPersona(persona.idPersona, 1).subscribe({
          next: (eliminarPersona:EliminarPersona) => {
            console.log(eliminarPersona, 'persona eliminado');
            Swal.fire({
              title: "¡ELIMINADO!",
              text: `EL USUARIO ${persona.apellidoPaterno} ${persona.apellidoMaterno} ${persona.nombres} FUE ELIMINADO CORRECTAMENTE`,
              icon: "success"
            })
            setTimeout(() => {
              this.listaPersona();
            }, 300);
          }
        })
      }
    })
  }

  asignarRol(persona: ListarPersona){
    console.log(persona);
    this.router.navigate(['/mf-rol']).then(() => {
      setTimeout(() => {
        const evento = new CustomEvent('abrirModal', {detail:{mensaje: persona}});  
        window.dispatchEvent(evento);
        console.log('abriendo el modal');
      }, 400);
    });
  }
}

