import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlmacenesPage } from './almacenes.page';

describe('AlmacenesPage', () => {
  let component: AlmacenesPage;
  let fixture: ComponentFixture<AlmacenesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
