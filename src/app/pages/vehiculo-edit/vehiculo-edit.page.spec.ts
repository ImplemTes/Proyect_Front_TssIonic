import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculoEditPage } from './vehiculo-edit.page';

describe('VehiculoEditPage', () => {
  let component: VehiculoEditPage;
  let fixture: ComponentFixture<VehiculoEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
