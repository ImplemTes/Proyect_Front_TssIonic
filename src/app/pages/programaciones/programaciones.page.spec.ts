import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramacionesPage } from './programaciones.page';

describe('ProgramacionesPage', () => {
  let component: ProgramacionesPage;
  let fixture: ComponentFixture<ProgramacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
