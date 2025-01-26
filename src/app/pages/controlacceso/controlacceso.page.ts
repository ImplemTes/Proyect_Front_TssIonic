import { Component,HostListener, OnInit } from '@angular/core';
import { ProgramacionService } from 'src/app/services/programacion.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ControlaccesoService } from 'src/app/services/controlacceso.service';
import { FormGroup, Validators, FormBuilder, RadioControlValueAccessor } from '@angular/forms';
import { AlmacenService } from 'src/app/services/almacen.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-controlacceso',
  templateUrl: './controlacceso.page.html',
  styleUrls: ['./controlacceso.page.scss'],
})
export class ControlaccesoPage implements OnInit {
  public selectedPageTitle: string = 'Control de Acceso';
  isModalOpen: boolean = false;
  accesos: any = [];
  programaciones: any = [];
  selectedProgra: any = [];
  personas: any = [];
  almacenes: any = [];
  vehiculos: any = [];
  fechaInicioRegistro: string = '';
  fechaAsignada: boolean = false; // Controla si la fecha ya fue asignada
  detalleForm: FormGroup;
  selectedAcceso: any = null;
  isModalOpenEliminar: boolean = false;
  isMobileView: boolean = false;
  isModalOpenEditar: boolean = false;



  filteredAccesos = [...this.accesos];
  searchPlaca: string = '';

  // Paginación
  p: number = 1; // Página actual
  itemsPerPage: number = 6; // Elementos por página
  constructor(
    private controlaccesoService: ControlaccesoService,
    private vehiculoService: VehiculoService,
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
    this.listarpersonas();
    this.listaralmacenes();
    this.listarvehiculos();
    this.listarprogramaciones();
    this.checkScreenSize();
    this.getaccesos();
    this.filteredAccesos = this.accesos;
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

  filtrarAcceso() {
    const searchTerm = this.searchPlaca.toLowerCase().trim();
    if (searchTerm === '') {
      this.filteredAccesos = this.accesos; // Mostrar todos si no hay búsqueda
    } else {
      this.filteredAccesos = this.accesos.filter((acceso: any) =>
        acceso.placa.toLowerCase().includes(searchTerm)
      );
    }
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
  getaccesos(): void {
    this.controlaccesoService.list().subscribe(
      (resp: any) => {
        this.accesos = resp;
        this.filteredAccesos = this.accesos;
      },
      (error) => {
        console.error('Error al mostrar los detalles', error);
      }
    );
  }

  seleccionarprogra(idprogramacion: any): void {

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
  }

  registrar(){
    this.router.navigate(['/home/controlacceso-create']);
  }
  isFieldInvalid(field: string): boolean {
    const control = this.detalleForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  openModalEliminar(acceso: any = null): void {
    this.isModalOpenEliminar = true;
    this.selectedAcceso = acceso;
  }

  closeModal(): void {
    this.isModalOpenEditar=false;
    this.isModalOpenEliminar = false;
    this.selectedAcceso = null;
    this.detalleForm.patchValue({
      idpersona: '',
      idalmacen: '',
      idprogramacion: 0,
      placa: '',
      marca: '',
      modelo: '',
      color: '',
      fecha:'',
      // Llenamos datos de la programacion
      fechaEntrada: '',
      fechaSalida: '',
      observacion: '',
    });
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
      fecha:'',
      fechaEntrada: '',
      fechaSalida: '',
      observacion: '',
    });
  };
  deleteAcceso(id: number): void {
    this.controlaccesoService.deletAcces(id).subscribe(() => {
      this.accesos = this.accesos.filter((prove: any) => prove.idacceso !== id);
      this.getaccesos();
      this.closeModal();
    });
  }

  openModalEditar(acceso: any = null): void {
    this.isModalOpenEditar = true;
    this.selectedAcceso = acceso;
    // Usamos patchValue para cargar los datos
    this.detalleForm.patchValue({
      idpersona: acceso.idpersona,
      idalmacen: acceso.idalmacen,
      idprogramacion:acceso.idprogramacion,
      placa: acceso.placa,
      marca: acceso.marca,
      modelo: acceso.modelo,
      color: acceso.color,
      fechaEntrada: acceso.fechaEntrada,
      fechaSalida:acceso.fechaSalida,
      observacion: acceso.observacion, // Convertimos booleano a cadena
      fecha: this.fechaInicioRegistro,
    });
  }



  editardetalle() {
    if (this.detalleForm.valid) {
      this.controlaccesoService.updateAcceso(this.selectedAcceso.idacceso, this.detalleForm.value).subscribe(
        (resp: any) => {
          const index = this.accesos.findIndex((clien: any) => clien.idacceso === this.selectedAcceso.idacceso);
          if (index !== -1) {
            this.accesos[index] = { ...this.accesos[index], ...this.detalleForm.value };
          }
          this.getaccesos();
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el acceso', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

}
