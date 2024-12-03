import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';

import { AlmacenService } from 'src/app/services/almacen.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ControlaccesoService } from 'src/app/services/controlacceso.service';
import { ProgramacionService } from 'src/app/services/programacion.service';

@Component({
  selector: 'app-controlacceso-create',
  templateUrl: './controlacceso-create.page.html',
  styleUrls: ['./controlacceso-create.page.scss'],
})
export class ControlaccesoCreatePage implements OnInit {
  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('canvas') canvasElement!: ElementRef;
  placaobtenida: string = '';
  personas: any = [];
  almacenes: any = [];
  programaciones: any = [];
  selectedProgra: any = [];
  vehiculos: any = [];
  urlobtenida: string = '';
  fechaInicioRegistro: string = '';
  fechaAsignada: boolean = false; // Controla si la fecha ya fue asignada
  public selectedPageTitle: string = 'Registro Detalle';
  detalleForm: FormGroup;
  imagePath: string | null | undefined = null;
  verCamara: boolean = true;
  verbtnCapt: boolean = true;


  constructor(
    private vehiculoService: VehiculoService,
    private controlaccesoService: ControlaccesoService,
    private almacenService: AlmacenService,
    private programacionService: ProgramacionService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.detalleForm = this.fb.group({
      //Para un nuevo formulario Acceso
      idprogramacion: [0],
      idalmacen: ['', Validators.required],
      idpersona: ['', Validators.required],
      observacion: [''],
      fechaEntrada: [null, Validators.required],
      fechaSalida: [null, Validators.required],
      placa: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      color: ['', Validators.required],
      fecha: [this.fechaInicioRegistro],
    });
  }

  ngOnInit() {
    this.placaobtenida;
    this.urlobtenida;
    this.listarpersonas();
    this.listaralmacenes();
    this.listarprogramaciones();
    this.listarvehiculos();
    // Solo asigna la fecha si no ha sido asignada antes
    if (!this.fechaAsignada) {
      this.fechaInicioRegistro = this.getFechaActual();
      this.fechaAsignada = true; // Marca como asignada
      // Asignamos la fecha al campo 'fecha' del formulario
      this.detalleForm.patchValue({
        fecha: this.fechaInicioRegistro // Esto establece la fecha en el formulario
      });
    }
  }
  getFechaActual(): string {
    const ahora = new Date();
    const year = ahora.getFullYear();
    const month = String(ahora.getMonth() + 1).padStart(2, '0'); // Meses van de 0-11
    const day = String(ahora.getDate()).padStart(2, '0');
    const hours = String(ahora.getHours()).padStart(2, '0');
    const minutes = String(ahora.getMinutes()).padStart(2, '0');
    const seconds = String(ahora.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  listarpersonas(): void {
    this.controlaccesoService.listPersonas().subscribe(
      (resp: any) => {
        this.personas = resp;
      },
      (error) => {
        console.error('Error al mostrar las personas', error);
      }
    );
  }

  listaralmacenes(): void {
    this.almacenService.list().subscribe(
      (resp: any) => {
        this.almacenes = resp;
      },
      (error) => {
        console.error('Error al mostrar los almacenes', error);
      }
    );
  }
  listarvehiculos(): void {
    this.vehiculoService.list().subscribe(
      (resp: any) => {
        this.vehiculos = resp;
      },
      (error) => {
        console.error('Error al mostrar los vehiculos', error);
      }
    );
  }
  listarprogramaciones(): void {
    this.programacionService.list().subscribe(
      (resp: any) => {
        this.programaciones = resp;

      },
      (error) => {
        console.error('Error al mostrar las programaciones', error);
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
    this.imagePath = null;
    this.verCamara = true;
    this.verbtnCapt = true;
    this.router.navigate(['/home/controlacceso']);
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
    this.verbtnCapt = true;
    this.verCamara = false;
  }

  // Función para capturar la imagen desde el video y mostrarla en un canvas
  CapturarImagenWeb() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    this.verbtnCapt = false;
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
    this.urlobtenida = '';
    this.placaobtenida = '';
    this.selectedProgra = '';
    this.detalleForm.patchValue({ placa: '' });
    this.verbtnCapt = true;
    const video = this.videoElement.nativeElement;
    const stream = video.srcObject as MediaStream;
    const tracks = stream.getTracks();
    // Detener cada pista de la cámara
    tracks.forEach(track => track.stop());
    video.srcObject = null;
  }
  LimpiarData() {
    this.selectedProgra = null;
    this.detalleForm.patchValue({
      idpersona: '',
      idalmacen: '',
      idprogramacion: 0,
      placa: '',
      marca: '',
      modelo: '',
      color: '',
      fechaEntrada: '',
      fechaSalida: '',
      observacion: '',
      
    });
  };
  // Función para enviar la imagen al backend
  EnviarCaptura(): void {
    if (this.imagePath) {
      const formData = new FormData();
      const fileBlob = this.dataURLtoBlob(this.imagePath);
      formData.append('file', fileBlob, 'captura.png');  // Envía el archivo como .png

      this.vehiculoService.ObtenerObjeto(formData).subscribe(
        (Res: any) => {
          console.log("Se ha recibido correctamente", Res);
          this.placaobtenida = Res.plate;
          this.urlobtenida = Res.image_url;
          this.detalleForm.patchValue({ placa: this.placaobtenida });
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

  isFieldInvalid(field: string): boolean {
    const control = this.detalleForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  seleccionarprogra(idprogramacion: any): void {
    if (idprogramacion != 0 || idprogramacion != null) {
      console.log('ID de programación seleccionado:', idprogramacion); // Debugging
      this.programacionService.getProgra(idprogramacion).subscribe(
        (resp: any) => {
          // Capturar datos del vehiculo asimismo de la programacion
          this.vehiculoService.getVehiculo(resp.idvehiculo).subscribe(
            (resp2: any) => {
              console.log('Datos del vehículo:', resp2.idvehiculo);  // Verifica los datos del vehículo
              this.detalleForm.patchValue({
                // Llenamos datos del vehiculo
                placa: resp2.placa,
                marca: resp2.marca,
                modelo: resp2.modelo,
                color: resp2.color,
                // Llenamos datos de la programacion
                fechaEntrada: resp.fechaEntrada,
                fechaSalida: resp.fechaSalida,
                observacion: resp.observacion,
              });
              console.log('Formulario después de patchValue:', this.detalleForm.value);
            },
            (error) => {
              console.error('Error al obtener el vehículo', error);
            }
          );
        },
        (error) => {
          console.error('Error al obtener el vehículo', error);
        }
      );
    } else {
      this.LimpiarData();
    }
  }

  createdata(): void {

    if (this.detalleForm.valid) {
      //const fechaValor = this.detalleForm.get('fecha')?.value;
     // console.log('Valor de la fecha:', fechaValor);
     // console.log('Datos enviados al backend:', this.detalleForm.value); // Imprime los datos enviados
      this.controlaccesoService.create(this.detalleForm.value).subscribe(
        (resp: any) => {
          console.log('Respuesta del backend:', resp);
          this.closeModal();
          this.router.navigate(['/home/controlacceso']).then(() => {
          //Una vez que llegues a la página, la recargas
           window.location.reload();
          });

        },
        (error) => {
          console.error('Error al registrar' + error.message);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

}