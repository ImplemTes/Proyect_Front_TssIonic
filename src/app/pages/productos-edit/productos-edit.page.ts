import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-productos-edit',
  templateUrl: './productos-edit.page.html',
  styleUrls: ['./productos-edit.page.scss'],
})
export class ProductosEditPage implements OnInit {
  idproducto!: number;
  public selectedPageTitle: string = 'Editar Producto';
  tipos: any = [];
  selectedFile: File | null = null;
  imageToShow: any;
  imageError: string | null = null; // Para los errores de validación de la imagen

  productoForm: FormGroup = this.fb.group({
    idtipo: [0, Validators.required],
    nombre_producto: ['', Validators.required],
    stock_producto: [0, [Validators.required, Validators.min(1)]],
    unidad_de_medida: ['', Validators.required],
    precio_producto: [0.00, [Validators.required, Validators.min(0.01)]],
  });

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute // Para obtener el id del producto
  ) { }
  ngOnInit() {
    this.listarTipos();
    this.cargarProducto(); // Cargar los datos del producto
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

  // Función para verificar si un campo del formulario es inválido y ha sido tocado
  isFieldInvalid(field: string): boolean {
    const control = this.productoForm.get(field); // Obtener el control del formulario por el nombre del campo
    return control ? control.invalid && control.touched : false; // Verificar si es inválido y ha sido tocado
  }

  cargarProducto() {
    // Obtener el id del producto desde la URL
    this.idproducto = this.route.snapshot.params['id'];

    // Llamar al servicio para obtener los datos del producto
    this.productoService.getById(this.idproducto).subscribe(
      (producto: any) => {
        this.productoForm.patchValue({
          idtipo: producto.idtipo,
          nombre_producto: producto.nombre_producto,
          stock_producto: producto.stock_producto,
          unidad_de_medida: producto.unidad_de_medida,
          precio_producto: producto.precio_producto,
        });
        // Mostrar la imagen existente del producto
        this.imageToShow = producto.urlimagen;
      },
      (error) => {
        console.error('Error al cargar el producto', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.imageError = null;

    if (this.selectedFile) {
      if (this.selectedFile.type !== 'image/png' && this.selectedFile.type !== 'image/jpeg') {
        this.imageError = 'Solo se permiten archivos PNG o JPEG.';
        this.selectedFile = null;
        return;
      }

      if (this.selectedFile.size > 5 * 1024 * 1024) {
        this.imageError = 'El tamaño del archivo no debe exceder los 5 MB.';
        this.selectedFile = null;
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imageToShow = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  submitFormSave() {
    if (this.productoForm.invalid || this.imageError) {
      return;
    }

    const formData = new FormData();
    formData.append('idtipo', this.productoForm.get('idtipo')?.value);
    formData.append('nombre_producto', this.productoForm.get('nombre_producto')?.value);
    formData.append('stock_producto', this.productoForm.get('stock_producto')?.value);
    formData.append('unidad_de_medida', this.productoForm.get('unidad_de_medida')?.value);
    formData.append('precio_producto', this.productoForm.get('precio_producto')?.value);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    // Llamar al servicio para editar el producto
    this.productoService.edit(this.idproducto, formData).subscribe(
      (data: any) => {
        console.log('Producto actualizado correctamente', data);
        this.router.navigate(['/home/productos']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        const errorMsg = this.formatErrorMessage(error);
        alert(errorMsg);
      }
    );
  }

  formatErrorMessage(error: any): string {
    if (error.error && error.error.detail) {
      return `Error del servidor: ${error.error.detail}`;
    }
    return `Error inesperado: ${JSON.stringify(error)}`;
  }

  closeModal() {
    this.router.navigate(['/home/productos']);
  }
}
