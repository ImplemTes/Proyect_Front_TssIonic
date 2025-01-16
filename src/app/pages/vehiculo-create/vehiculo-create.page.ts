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

  public selectedPageTitle: string = 'Registro Vehiculo';
  fechaInicioRegistro: string = '';
  fechaAsignada: boolean = false; // Controla si la fecha ya fue asignada
  vehiculoForm: FormGroup = this.fb.group({
    placa: ['', Validators.required],
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    color: ['', Validators.required],
    fecha: [this.fechaInicioRegistro],
  });
  constructor(
    private vehiculoService: VehiculoService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    // Solo asigna la fecha si no ha sido asignada antes
    if (!this.fechaAsignada) {
      this.fechaInicioRegistro = this.getFechaActual();
      this.fechaAsignada = true; // Marca como asignada
      // Asignamos la fecha al campo 'fecha' del formulario
      this.vehiculoForm.patchValue({
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

  closeModal() {
    this.router.navigate(['/home/vehiculos']);
  }

}