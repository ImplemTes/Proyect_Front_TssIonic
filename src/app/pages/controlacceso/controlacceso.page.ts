import { Component,HostListener, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-controlacceso',
  templateUrl: './controlacceso.page.html',
  styleUrls: ['./controlacceso.page.scss'],
})
export class ControlaccesoPage implements OnInit {
  public selectedPageTitle: string = 'Vehiculos';
  vehiculos: any = [];
  selectedVehiculo: any = null;
  isModalOpenEliminar: boolean = false;
  isMobileView: boolean = false;
  // Paginación
  p: number = 1; // Página actual
  itemsPerPage: number = 6; // Elementos por página
  constructor(
    private vehiculoService: VehiculoService,
    private fb: FormBuilder,
    private router: Router
  ) { }

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

  registrar(){
    this.router.navigate(['/home/controlacceso-create']);
  }

  openModalEliminar(vehiculo: any = null): void {
    this.isModalOpenEliminar = true;
    this.selectedVehiculo = vehiculo;
  }

  closeModal(): void {
    this.isModalOpenEliminar = false;
    this.selectedVehiculo = null;
  }

  deleteVehiculo(id: number): void {
    this.vehiculoService.delete(id).subscribe(() => {
      this.vehiculos = this.vehiculos.filter((prove: any) => prove.idvehiculo !== id);
      this.getVehiculos();
      this.closeModal();
    });
  }

  editarVehiculo(vehiculo: any) {
    this.router.navigate(['/home/vehiculo-edit/edit', vehiculo.idvehiculo]);
  }
  
}
