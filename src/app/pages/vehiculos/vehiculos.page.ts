import { Component,HostListener, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {
  public selectedPageTitle: string = 'Vehiculos';
  vehiculoForm: FormGroup;
  vehiculos: any = [];
  selectedVehiculo: any = null;
  isModalOpenEliminar: boolean = false;
  isModalOpenEditar: boolean = false;
  isMobileView: boolean = false;
  // Paginación
  p: number = 1; // Página actual
  itemsPerPage: number = 6; // Elementos por página
  constructor(
    private vehiculoService: VehiculoService,
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.vehiculoForm = this.fb.group({
      placa: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getVehiculos();
  }


  // Detectar cambios en el tamaño de pantalla
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.checkScreenSize();
    }
    checkScreenSize() {
      this.isMobileView = window.innerWidth < 720;
    }
  // Fin tamaño
  
  // Obtener vehículos
  getVehiculos(): void {
    this.vehiculoService.list().subscribe(
      (resp: any) => {
        this.vehiculos = resp;
      },
      (error) => {
        console.error('Error al mostrar los vehiculos', error);
      }
    );
  }
  openModalEliminar(vehiculo: any = null): void {
    this.isModalOpenEliminar = true;
    this.selectedVehiculo = vehiculo;
  }

  closeModal(): void {
    this.isModalOpenEliminar = false;
    this.isModalOpenEditar=false;
    this.selectedVehiculo = null;
      this.vehiculoForm.reset({ // reset pero con predetermin de lo contrario son null
        placa: '',
        marca: '',
        modelo: '',
        color: '',
      });
    }
  

  deleteVehiculo(id: number): void {
    this.vehiculoService.delete(id).subscribe(() => {
      this.vehiculos = this.vehiculos.filter((prove: any) => prove.idvehiculo !== id);
      this.getVehiculos();
      this.closeModal();
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.vehiculoForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  openModalEditar(vehiculo: any = null): void {
    this.isModalOpenEditar = true;
    this.selectedVehiculo = vehiculo;
    // Usamos patchValue para cargar los datos
    this.vehiculoForm.patchValue({
      placa: vehiculo.placa,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      color: vehiculo.color,
    });
  }

  
  editarVehiculo(): void {
    if (this.vehiculoForm.valid) {
      this.vehiculoService.update(this.selectedVehiculo.idvehiculo, this.vehiculoForm.value).subscribe(
        (resp: any) => {
          const index = this.vehiculos.findIndex((clien: any) => clien.idvehiculo === this.selectedVehiculo.idvehiculo);
          if (index !== -1) {
            this.vehiculos[index] = { ...this.vehiculos[index], ...this.vehiculoForm.value };
          }
          this.getVehiculos()
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el vehiculo', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }
}
