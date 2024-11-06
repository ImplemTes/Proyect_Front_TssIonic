import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';

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

  imagePath: string | null | undefined = null;
  verCamara: boolean = true;
  verbtnCapt: boolean = true;


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
    this.imagePath = null;
    this.verCamara = true;
    this.verbtnCapt=true;
    this.router.navigate(['/home/vehiculos']);
  }


  // Activa la cámara dependiendo de la plataforma
  activarCamara() {
    if (Capacitor.isNativePlatform()) {
      this.abrirCamaraMovil();
    } else {
      this.abrirCamaraWeb();
    }
  }


  // Función para abrir la cámara en dispositivos móviles
  async abrirCamaraMovil() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });
      this.imagePath = `data:image/png;base64,${image.base64String}`;
      this.verCamara = false;
      
      this.EnviarCaptura();
    } catch (error) {
      console.error("Error al capturar la imagen", error);
    }
  }

  // Función para abrir la cámara en la web
  async abrirCamaraWeb() {
    const video = this.videoElement.nativeElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      video.play();
    }
    this.verbtnCapt=true;
    this.verCamara = false;
  }

  // Función para capturar la imagen desde el video y mostrarla en un canvas
  CapturarImagenWeb() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    this.verbtnCapt=false;
    const context = canvas.getContext('2d');
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imagePath = canvas.toDataURL('image/png');  // Exporta la imagen en formato PNG
    }
    this.EnviarCaptura();
  }

  // Función para limpiar la imagen capturada y detener la cámara
  LimpiarCaptura() {
    this.imagePath = null;
    this.verCamara = true;
    this.verbtnCapt=true;
    const video = this.videoElement.nativeElement;
    const stream = video.srcObject as MediaStream;
    const tracks = stream.getTracks();
    // Detener cada pista de la cámara
    tracks.forEach(track => track.stop());
    video.srcObject = null;
  }

  // Función para enviar la imagen al backend
  EnviarCaptura(): void {
    if (this.imagePath) {
      const formData = new FormData();
      const fileBlob = this.dataURLtoBlob(this.imagePath);
      formData.append('file', fileBlob, 'captura.png');  // Envía el archivo como .png

      this.vehiculoService.ObtenerObjeto(formData).subscribe(
        (Res: any) => {
          console.log("Se ha recibido correctamente", Res);
          this.plagaobtenida = Res.plate;
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

  // Helper para convertir DataURL a Blob
  private dataURLtoBlob(dataUrl: string): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime || 'image/png' });
  }
}