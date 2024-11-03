import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbastecimientoPage } from './abastecimiento.page';

describe('AbastecimientoPage', () => {
  let component: AbastecimientoPage;
  let fixture: ComponentFixture<AbastecimientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AbastecimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
