import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosCreatePage } from './productos-create.page';

describe('ProductosCreatePage', () => {
  let component: ProductosCreatePage;
  let fixture: ComponentFixture<ProductosCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
