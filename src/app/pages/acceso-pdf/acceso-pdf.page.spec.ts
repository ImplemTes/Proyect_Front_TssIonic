import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccesoPdfPage } from './acceso-pdf.page';

describe('AccesoPdfPage', () => {
  let component: AccesoPdfPage;
  let fixture: ComponentFixture<AccesoPdfPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesoPdfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
