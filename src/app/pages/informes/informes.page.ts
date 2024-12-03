import { Component, HostListener, OnInit } from '@angular/core';
import { ProgramacionService } from 'src/app/services/programacion.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ControlaccesoService } from 'src/app/services/controlacceso.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlmacenService } from 'src/app/services/almacen.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-informes',
  templateUrl: './informes.page.html',
  styleUrls: ['./informes.page.scss'],
})
export class InformesPage implements OnInit {
  isModalOpen: boolean = false;
  accesos: any = [];
  programaciones: any = [];
  selectedProgra: any = [];
  personas: any = [];
  almacenes: any = [];
  vehiculos: any = [];
  filtroForm: FormGroup;
  selectedAcceso: any = null;
  isModalOpenEliminar: boolean = false;
  isMobileView: boolean = false;
  isModalOpenEditar: boolean = false;
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
    this.filtroForm = this.fb.group({
      almacen: [''],
      fechaInicio: [''],
      fechaFin: [''],
    });
  }

  ngOnInit() {
    this.getaccesos();
    this.listarpersonas();
    this.listaralmacenes();
    this.listarvehiculos();
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

  getaccesos(): void {
    this.controlaccesoService.list().subscribe(
      (resp: any) => {
        this.accesos = resp;
      },
      (error) => {
        console.error('Error al mostrar los detalles', error);
      }
    );
  }

  filtrarDatos() {
    const fechaInicio = this.filtroForm.value.fechaInicio;
    const fechaFin = this.filtroForm.value.fechaFin;
    const almacenSeleccionado = this.filtroForm.value.almacen;

    // Validar que al menos una opción esté seleccionada
    if (!fechaInicio && !fechaFin && !almacenSeleccionado) {
      console.warn("Debe seleccionar al menos un criterio para filtrar.");
      return;
    }

    // Filtrar registros
    this.accesos = this.accesos.filter((acceso: any) => {
      // Convertir fechaEntrada a una fecha sin tiempo para comparar
      const fechaEntrada = new Date(acceso.fechaEntrada).setHours(0, 0, 0, 0);
      const inicio = fechaInicio ? new Date(fechaInicio).setHours(0, 0, 0, 0) : null;
      const fin = fechaFin ? new Date(fechaFin).setHours(23, 59, 59, 999) : null; // Incluye todo el día

      // Filtrar por rango de fechas
      const enRangoFecha =
        (!inicio || fechaEntrada >= inicio) &&
        (!fin || fechaEntrada <= fin);

      // Filtrar por almacén
      const coincideAlmacen = almacenSeleccionado
        ? acceso.nombre_almacen === almacenSeleccionado
        : true;

      // Retornar true si cumple con los criterios
      return enRangoFecha && coincideAlmacen;
    });
  }

  limpiarFiltros() {
    this.filtroForm.patchValue({
      almacen: '',
      fechaInicio: '',
      fechaFin: '',
    });
    this.getaccesos(); // Recargar todos los accesos originales
  }
  generarpdf(){

    
  }
}
