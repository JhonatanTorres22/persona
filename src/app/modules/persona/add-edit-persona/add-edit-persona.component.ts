import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgregarPersona, EditarPersona } from 'src/app/core/models/persona.model';
import { PersonaService } from 'src/app/infraestructura/services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-persona',
  templateUrl: './add-edit-persona.component.html',
  styleUrls: ['./add-edit-persona.component.scss']
})
export class AddEditPersonaComponent implements OnInit {

  modoAgregando : boolean = false;
  formPersona!: FormGroup
  operacion : string = ''
  constructor(
    private dialogRef:MatDialogRef<AddEditPersonaComponent>,
    private personaService:PersonaService,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    this.formPersona = fb.group({
      idPersona: [''],
      nombres:['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      nDocumento: ['', Validators.required],
      telFijo: ['', Validators.required],
      telCelular:['', Validators.required],
      correoElectronico: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      contrasenia: [''],
    })
  }

  ngOnInit(): void {
    if(this.data.tipo == 1){
      this.operacion = 'AGREGAR';
      this.modoAgregando = true;
    }

    else {
      this.operacion = 'EDITAR';
      this.editarPersona(1);
      this.modoAgregando = false;
    }
  }

  agregarPersona(){
    let agregarPersona : AgregarPersona = {
      apellidoMaterno : this.formPersona.value.apellidoMaterno,
      apellidoPaterno : this.formPersona.value.apellidoPaterno,
      contrasenia : this.formPersona.value.contrasenia,
      correoElectronico : this.formPersona.value.correoElectronico,
      nDocumento : this.formPersona.value.nDocumento,
      nombres : this.formPersona.value.nombres,
      nombreUsuario : this.formPersona.value.nombreUsuario,
      telCelular : this.formPersona.value.telCelular,
      telFijo : this.formPersona.value.telFijo,
      usuarioCreacion : 1
    }
    console.log(agregarPersona, 'DATOS DE AGREGAR PERSONA');

    this.personaService.agregarPersona(agregarPersona).subscribe({
      next: (agregarPersona:AgregarPersona) => {
        Swal.fire({
          icon: 'success',
          title: '¡ CREADO !',
          text: `EL USUARIO ${agregarPersona.apellidoPaterno} ${agregarPersona.apellidoMaterno} ${agregarPersona.nombres} FUE CREADO CORRECTAMENTE`
        })
      }, error : (e) => {
        console.log('error');
      }, complete: () => {this.dialogRef.close('Guardar')}
    })
    
  }

  editarPersona(estado:number){
    let editarPersona : EditarPersona = {
      idPersona : this.data.persona.idPersona,
      apellidoMaterno : this.formPersona.value.apellidoMaterno,
      apellidoPaterno : this.formPersona.value.apellidoPaterno,
      correoElectronico : this.formPersona.value.correoElectronico,
      nDocumento : this.formPersona.value.nDocumento,
      nombres : this.formPersona.value.nombres,
      nombreUsuario : this.formPersona.value.nombreUsuario,
      telCelular : this.formPersona.value.telCelular,
      telFijo : this.formPersona.value.telFijo,
      usuarioModificacion : 1
    }

    this.formPersona.patchValue({
      idPersona : this.data.persona.idPersona,
      apellidoMaterno : this.data.persona.apellidoMaterno,
      apellidoPaterno : this.data.persona.apellidoPaterno,
      nombres : this.data.persona.nombres,
      nDocumento : this.data.persona.nDocumento,
      telFijo : this.data.persona.telFijo,
      telCelular : this.data.persona.telCelular,
      correoElectronico : this.data.persona.correoElectronico,
      nombreUsuario : this.data.persona.nombreUsuario,
      usuarioModificacion : 1
    })
    if(estado == 1) {return}
    this.personaService.editarPersona(editarPersona).subscribe({
      next: (editarPersona:EditarPersona) => {
        Swal.fire({
          icon:'success',
          title: " ¡EDITADO! ",
          text: `EL USUARIO ${editarPersona.apellidoPaterno} ${editarPersona.apellidoMaterno} ${editarPersona.nombres} FUE EDITADO CORRECTAMENTE`
        })
      }, error : (e) => {
        console.log('error');
      }, complete: () => {this.dialogRef.close('Guardar')}
    })
  }

  add_edit(){
    if(this.formPersona.invalid){return}

    Swal.fire({
      icon: 'question',
      title: '¿CONFIRMAR?',
      text: '¿ESTÁ SEGURO QUE DESEA GUARDAR LOS CAMBIOS?',
      showCancelButton: true,
      confirmButtonText: "GUARDAR",
      cancelButtonText: "CANCELAR",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if(result.isConfirmed){
        if(this.data.tipo == 1){
          this.agregarPersona();
        }
    
        else{
          this.editarPersona(2)
        }
      }
    })
  }
}
