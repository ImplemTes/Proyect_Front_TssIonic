import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productoForm: FormGroup;
  public selectedPageTitle: string = 'Productos';
  productos: any = [];
  selectedProducto: any = null;
  isModalOpenEliminar: boolean = false;
  isModalOpen: boolean = false;
  isModalOpenEditar: boolean = false;

  // Paginación
  p: number = 1; // Página actual
  itemsPerPage: number = 8; // Elementos por página
  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder
  ) {
    this.productoForm = this.fb.group({
      idtipo: ['', [Validators.required]],  // Solo números enteros
      nombre_producto: ['', [Validators.required, Validators.minLength(4)]], // Mínimo 3 caracteres
      stock_producto: [0, [Validators.required, Validators.min(0)]],
      unidad_de_medida: ['', [Validators.required, Validators.minLength(2)]],  // Mínimo 2 caracteres
      precio_producto: [0.00, [Validators.required]], // Números decimales, con hasta dos decimales
      imagen: ['', [Validators.required]], // Validación personalizada para archivos (puedes agregar más)
      estado: [1], // Valor predeterminado como 1
    });
  }

  ngOnInit() {
    this.listarProductos();
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
  // Método para saber si un campo es inválido y fue tocado
  openModalRegistrar(): void {
    this.isModalOpen = true;
  }

  openModalEliminar(producto: any = null): void {
    this.isModalOpenEliminar = true;
    this.selectedProducto = producto;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isModalOpenEditar = false;
    this.isModalOpenEliminar = false;
    this.selectedProducto = null;

    this.productoForm.reset({ // reset pero con predetermin de lo contrario son null
      idtipo: 0,
      nombre_producto: '',
      stock_producto: 0,
      unidad_de_medida: '',
      precio_producto: 0.00,
      nombre_proveedor: '',
      imagen: '',
      estado: 1,
    });
    // Si tienes un campo de archivo (input file), puedes limpiar el valor del input manualmente:
    const inputFile = document.getElementById('inputFileId') as HTMLInputElement;
    if (inputFile) {
      inputFile.value = '';  // Limpiar el campo del archivo (si es aplicable)
    }
  }

  //Para ver si un campo fue tocado para la list
  isFieldInvalid(field: string): boolean {
    const control = this.productoForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  onlyNumber(event: KeyboardEvent) {
    const char = String.fromCharCode(event.keyCode);
    if (!/^[0-9]*$/.test(char)) {
      event.preventDefault();
    }
  }
  onlyNumberPunt(event: KeyboardEvent) {
    const char = String.fromCharCode(event.keyCode);
    const inputElement = event.target as HTMLInputElement;
    if (!/^[0-9.]$/.test(char)) {
      event.preventDefault();
    }


  }
