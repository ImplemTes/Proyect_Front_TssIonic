import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  public selectedPageTitle: string = 'Productos';
  productos: any = [];
  tipos: any = [];
  selectedProducto: any = null;

  isModalOpenEliminar: boolean = false;
  // Paginación
  p: number = 1; // Página actual
  itemsPerPage: number = 6; // Elementos por página
  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private router: Router
  ) {
   
  }

  ngOnInit() {
    this.listarProductos();
    this.listarTipos();
  }

  listarProductos(): void {
    this.productoService.list().subscribe(
      (resp: any) => {
        this.productos = resp;
      },
      (error) => {
        console.error('Error al mostrar los productos', error);
      }
    );
  }
  listarTipos(): void {
    this.productoService.listipos().subscribe(
      (resp: any) => {
        this.tipos = resp;
      },
      (error) => {
        console.error('Error al mostrar los tipos', error);
      }
    );
  }

  openModalEliminar(producto: any = null): void {
    this.isModalOpenEliminar = true;
    this.selectedProducto = producto;
  }

  closeModal(): void {
    this.isModalOpenEliminar = false;
    this.selectedProducto = null;
  }

  deleteProveedor(id: number): void {
    this.productoService.delete(id).subscribe(() => {
      this.productos = this.productos.filter((prove: any) => prove.idproducto !== id);
      this.listarProductos();
      this.closeModal();
    });
  }

// Dentro de tu clase
  editarProducto(producto: any) {
    this.router.navigate(['/home/productos-edit/edit', producto.idproducto]);
  }
}