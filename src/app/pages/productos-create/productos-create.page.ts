import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos-create',
  templateUrl: './productos-create.page.html',
  styleUrls: ['./productos-create.page.scss'],
})
export class ProductosCreatePage implements OnInit {
  public selectedPageTitle: string = 'Registro Productos';
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
    private router: Router
  ) { }

  ngOnInit() {
    this.listarTipos();
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.imageError = null; // Reiniciar el error de la imagen

    if (this.selectedFile) {
      // Validar el tipo de archivo
      if (this.selectedFile.type !== 'image/png' && this.selectedFile.type !== 'image/jpeg') {
        this.imageError = 'Solo se permiten archivos PNG o JPEG.';
        this.selectedFile = null;
        return;
      }

      // Validar el tamaño del archivo (máximo 5 MB)
      if (this.selectedFile.size > 5 * 1024 * 1024) {
        this.imageError = 'El tamaño del archivo no debe exceder los 5 MB.';
        this.selectedFile = null;
        return;
      }

      // Mostrar la vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imageToShow = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.productoForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  submitFormSave() {
    if (this.productoForm.invalid || this.imageError) {
      // No enviar si el formulario es inválido o hay un error con la imagen
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

    this.productoService.create(formData).subscribe(
      (data: any) => {
        console.log("Se ha guardado correctamente", data);

        // Navegar a la página de productos
        this.router.navigate(['/home/productos']).then(() => {
          // Una vez que llegues a la página, la recargas
          window.location.reload();
        });
      },
      (error) => {
        const errorMsg = this.formatErrorMessage(error);
        alert(errorMsg); // Mostrar el mensaje de error formateado
      }
    );
  }
  formatErrorMessage(error: any): string {
    // Si el error tiene una respuesta del backend
    if (error.error && error.error.detail) {
      return `Error del servidor: ${error.error.detail}`;
    }

    // En caso de que no haya una respuesta específica
    return `Error inesperado: ${JSON.stringify(error)}`;
  }
  closeModal() {
    this.router.navigate(['/home/productos']);
  }
}
