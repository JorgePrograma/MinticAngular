import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDirectivoComponent } from './listar-directivo.component';

describe('ListarDirectivoComponent', () => {
  let component: ListarDirectivoComponent;
  let fixture: ComponentFixture<ListarDirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDirectivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarDirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
