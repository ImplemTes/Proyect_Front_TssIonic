import { Component,HostListener, OnInit } from '@angular/core';
import { ProgramacionService } from 'src/app/services/programacion.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-programaciones',
  templateUrl: './programaciones.page.html',
  styleUrls: ['./programaciones.page.scss'],
})
export class ProgramacionesPage implements OnInit {
  prograForm: FormGroup;
  public selectedPageTitle: string = 'Programacion de acceso';
  programaciones: any = [];
  selectedProgra: any = null;
  isModalOpenEliminar: boolean = false;
  isModalOpen: boolean = false;
  isModalOpenEditar: boolean = false;
  isMobileView: boolean = false;
  // Paginación
  p: number = 1; // Página actual
  itemsPerPage: number = 8; // Elementos por página
  vehiculos: any = [];

  constructor(
    private programacionService: ProgramacionService,
    private vehiculoService: VehiculoService,
    private fb: FormBuilder
  ) {
    this.prograForm = this.fb.group({
      idvehiculo: ['', Validators.required],
      fechaEntrada: [null, Validators.required],
      fechaSalida: [null, Validators.required],
      observacion: [''],
      estado: [1],
    });
  }

  ngOnInit() {
    this.getVehiculos();
    this.listarprogramaciones();
    this.checkScreenSize();
  }
  // Detectar cambios en el tamaño de pantalla
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }
  checkScreenSize() {
    this.isMobileView = window.innerWidth < 720;
  }






  listarprogramaciones(): void {
    this.programacionService.list().subscribe(
      (resp: any) => {
        this.programaciones = resp;
      },
      (error) => {
        console.error('Error al mostrar los programaciones', error);
      }
    );
  }

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
  // Método para saber si un campo es inválido y fue tocado
  openModalRegistrar(): void {
    this.isModalOpen = true;
  }

  openModalEliminar(programacion: any = null): void {
    this.isModalOpenEliminar = true;
    this.selectedProgra = programacion;
  }
  closeModal(): void {
    this.isModalOpen = false;
    this.isModalOpenEditar = false;
    this.isModalOpenEliminar = false;
    this.selectedProgra = null;
    this.prograForm.reset({ // reset pero con predetermin de lo contrario son null
      idvehiculo: '',
      fechaEntrada: '',
      fechaSalida: '',
      observacion: '',
      estado: 1,
    });
  }

  createProgra(): void {
    if (this.prograForm.valid) {
      this.programacionService.create(this.prograForm.value).subscribe(
        (resp: any) => {
          this.listarprogramaciones();
          this.closeModal();
        },
        (error) => {
          console.error('Error al crear el programacion', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }
  

  //Para ver si un campo fue tocado para la list
  isFieldInvalid(field: string): boolean {
    const control = this.prograForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  onlyNumber(event: KeyboardEvent) {
    const char = String.fromCharCode(event.keyCode);
    if (!/^[0-9]*$/.test(char)) {
      event.preventDefault();
    }
  }

  openModalEditar(programacion: any = null): void {
    this.isModalOpenEditar = true;
    this.selectedProgra = programacion;
    // Usamos patchValue para cargar los datos
    this.prograForm.patchValue({
      idprogramacion: programacion.idprogramacion,
      idvehiculo: programacion.idvehiculo,
      fechaEntrada: programacion.fechaEntrada,
      fechaSalida: programacion.fechaSalida,
      observacion: programacion.observacion,
      estado: programacion.estado ? '1' : '0', // Convertimos booleano a cadena
    });
  }

  editarProgra(): void {
    if (this.prograForm.valid) {
      this.programacionService.updateProgra(this.selectedProgra.idprogramacion, this.prograForm.value).subscribe(
        (resp: any) => {
          const index = this.programaciones.findIndex((progra: any) => progra.idprogramacion === this.selectedProgra.idprogramacion);
          if (index !== -1) {
            this.programaciones[index] = { ...this.programaciones[index], ...this.prograForm.value };
          }
          this.listarprogramaciones();
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el programacion', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  deleteProgra(id: number): void {
    this.programacionService.deleteProgra(id).subscribe(() => {
      this.programaciones = this.programaciones.filter((progra: any) => progra.idprogramacion !== id);
      this.listarprogramaciones();
      this.closeModal();
    });
  }
}
