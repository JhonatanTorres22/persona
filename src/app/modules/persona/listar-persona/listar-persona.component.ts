import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EliminarPersona, ListarPersona } from 'src/app/core/models/persona.model';
import { PersonaService } from 'src/app/infraestructura/services/persona.service';
import { AddEditPersonaComponent } from '../add-edit-persona/add-edit-persona.component';
import Swal from 'sweetalert2';
import { ComunicacionService } from './servicio-compartido/comunicacion.service';
import { AddEditUsuarioConRolComponent } from '../../../../../../../rol/mf-rol/src/app/modules/rol/add-edit-usuario-con-rol/add-edit-usuario-con-rol.component'
import { Route, Router } from '@angular/router';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrls: ['./listar-persona.component.scss']
})
export class ListarPersonaComponent implements OnInit {
  isBordered = false;
  borderedCookie = 'no';
  loading : boolean = false;
  bordered$ = fromEvent(window, 'isBordered');
  displayedColumns: string[] = ['nombres', 'apellidoPaterno', 'apellidoMaterno', 'nDocumento', 'correoElectronico', 'acciones']
  listaDePersona!:ListarPersona;
  listarPersona: MatTableDataSource<ListarPersona>;

  constructor(
    private router:Router,
    private comunicacionService:ComunicacionService,
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
    this.comunicacionService.openModal();
    this.router.navigate(['/mf-rol']);
    this.isBordered = !this.isBordered;
    this.borderedCookie = this.isBordered ? 'yes': 'no';
    setCookie('bordered', this.borderedCookie);
    let event = new CustomEvent('isBordered' , {
      detail : {
        answer: this.isBordered
      },
    });
    window.dispatchEvent(event)
  }
}

export function setCookie(name: string, val: string) {
  const date = new Date();
  const value = val;
  // Set it expire in 7 days
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  // Set it
  document.cookie =
    name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
}
