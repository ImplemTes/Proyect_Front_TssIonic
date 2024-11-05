import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vehiculo-create',
  templateUrl: './vehiculo-create.page.html',
  styleUrls: ['./vehiculo-create.page.scss'],
})
export class VehiculoCreatePage implements OnInit {
  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('canvas') canvasElement!: ElementRef;
  plagaobtenida: string = '';
  public selectedPageTitle: string = 'Registro Vehiculo';

  imageError: string | null = null;
  imagePath:  string | null = null;


  verCamara: boolean = true;
 

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

  CreateVehiculo(): void {
    if (this.vehiculoForm.valid) {
      this.vehiculoService.create(this.vehiculoForm.value).subscribe(
        (resp: any) => {
          console.log("Se ha guardado correctamente", resp);
          this.router.navigate(['/home/vehiculos']).then(() => {
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















  

  // Función para iniciar la cámara en el navegador
  async abrirCamaraWeb() {
    const video = this.videoElement.nativeElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      video.play();
    }
    this.verCamara=false;
  }

  // Función para capturar la imagen desde el video y mostrarla en un canvas
  CapturarImagenWeb() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imagePath = canvas.toDataURL('image/png'); // Convertimos el canvas a una imagen base64
      this.EnviarCaptura();
    }
  }
 // Función para limpiar la imagen capturada y detener la cámara
 LimpiarCaptura() {
  this.imagePath = null;
  const video = this.videoElement.nativeElement;
  const stream = video.srcObject as MediaStream;
  const tracks = stream.getTracks();
  this.verCamara=true;
  // Detener cada pista de la cámara
  tracks.forEach(track => track.stop());
  video.srcObject = null;
}

  // Función para enviar la imagen al backend
  EnviarCaptura(): void {
    if (this.imagePath) {
      const formData = new FormData();
      formData.append('file', this.imagePath);
      this.vehiculoService.ObtenerObjeto(formData).subscribe(
        (data: any) => {
          console.log("Se ha recibido correctamente", data);
          this.plagaobtenida = data.placa;
          this.vehiculoForm.patchValue({ placa: this.plagaobtenida });
        }, 
        (error) => {
          console.error("Error al enviar la captura", error);
        }
      );
    } else {
      console.error("No se ha capturado ninguna imagen para enviar");
    }
  }
}