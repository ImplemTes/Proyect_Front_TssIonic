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

  closeModal() {
    this.router.navigate(['/home/vehiculos']);
  }

}