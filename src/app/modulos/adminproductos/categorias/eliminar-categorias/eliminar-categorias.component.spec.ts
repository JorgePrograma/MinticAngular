import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCategoriasComponent } from './eliminar-categorias.component';

describe('EliminarCategoriasComponent', () => {
  let component: EliminarCategoriasComponent;
  let fixture: ComponentFixture<EliminarCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarCategoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
