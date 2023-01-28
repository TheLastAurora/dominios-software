import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcursoFormComponent } from './concurso-form.component';

describe('ConcursoFormComponent', () => {
  let component: ConcursoFormComponent;
  let fixture: ComponentFixture<ConcursoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcursoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcursoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
