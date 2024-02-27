import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPersonaComponent } from './listar-persona.component';

describe('ListarPersonaComponent', () => {
  let component: ListarPersonaComponent;
  let fixture: ComponentFixture<ListarPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarPersonaComponent]
    });
    fixture = TestBed.createComponent(ListarPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
