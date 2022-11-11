import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarVehiculosComponent } from './eliminar-vehiculos.component';

describe('EliminarVehiculosComponent', () => {
  let component: EliminarVehiculosComponent;
  let fixture: ComponentFixture<EliminarVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarVehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
