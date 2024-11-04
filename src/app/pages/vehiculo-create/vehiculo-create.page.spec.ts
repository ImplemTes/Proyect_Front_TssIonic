import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculoCreatePage } from './vehiculo-create.page';

describe('VehiculoCreatePage', () => {
  let component: VehiculoCreatePage;
  let fixture: ComponentFixture<VehiculoCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
