import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlaccesoCreatePage } from './controlacceso-create.page';

describe('ControlaccesoCreatePage', () => {
  let component: ControlaccesoCreatePage;
  let fixture: ComponentFixture<ControlaccesoCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlaccesoCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
