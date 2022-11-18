import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosClienteComponent } from './vehiculos-cliente.component';

describe('VehiculosClienteComponent', () => {
  let component: VehiculosClienteComponent;
  let fixture: ComponentFixture<VehiculosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
