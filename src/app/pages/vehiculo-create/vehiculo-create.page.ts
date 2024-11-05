import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vehiculo-create',
  templateUrl: './vehiculo-create.page.html',
  styleUrls: ['./vehiculo-create.page.scss'],
})
export class VehiculoCreatePage implements OnInit {

  plagaobtenida: string = '';
  public selectedPageTitle: string = 'Registro Vehiculo';
  selectedFile: File | null = null;
  imageToShow: any;
  imageError: string | null = null; // Para los errores de validación de la imagen
  vehiculoForm: FormGroup = this.fb.group({
    placa: ['', Validators.required],
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    color: ['', Validators.required],
  });
  constructor(
    private vehiculoService: VehiculoService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // Método para guardar el vehículo
  submitFormSave(): void {
    if (this.vehiculoForm.valid) {
      this.vehiculoService.create(this.vehiculoForm.value).subscribe(
        (resp: any) => {
          console.log("Se ha guardado correctamente", resp);

          // Navegar a la página de vehiculo
          this.router.navigate(['/home/vehiculos']).then(() => {
            // Una vez que llegues a la página, la recargas
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error al crear el vehículo', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.vehiculoForm.get(field);
    return control ? control.invalid && control.touched : false;
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
    this.router.navigate(['/home/vehiculos']);
  }

  // ============================================
  // MANEJO DE LA CAMARA: CAPTURA Y ENVIO DE LA IMAGEN ES DECIR
  // ENVIAR EL FRAME MEDIANTE ARCHIVO formData A MI SERVICIO Y ESTE LO ENVIARA A MI BACKEND
  // Y LUEGO, RECIBIRE UN STRING
  // ============================================
  
  
  CapturarImagen(){
    
  }
  ResetCamara(){
    this.vehiculoForm.patchValue({ placa: '' });  //campo de la placa

  }

  LimpiarCampo(){
    this.vehiculoForm.patchValue({ placa: '' });  //campo de la placa
    this.selectedFile = null;
    this.imageToShow = null;
    this.imageError = null; 
  }

  EnviarCaptura(): void{
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.vehiculoService.ObtenerObjeto(formData).subscribe(
      (data: any) => {
        console.log("Se ha recibido correctamente", data);
        // Navegar a la página de productos
         this.plagaobtenida = data.placa;
         this.vehiculoForm.patchValue({ placa: this.plagaobtenida });
       }, 
      (error) => {
        const errorMsg = this.formatErrorMessage(error);
        alert(errorMsg);  
      }
    );
  }

}