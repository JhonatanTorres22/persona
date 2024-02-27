import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  private modalSubject = new Subject<void>();

  modalOpened$ = this.modalSubject.asObservable();

  openModal() {
    this.modalSubject.next();
    console.log('abriendo el modal');
  }
  
  constructor() { }
}
