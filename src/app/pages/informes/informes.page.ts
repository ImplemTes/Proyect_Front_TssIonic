import { Component, HostListener, OnInit } from '@angular/core';
import { ProgramacionService } from 'src/app/services/programacion.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ControlaccesoService } from 'src/app/services/controlacceso.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlmacenService } from 'src/app/services/almacen.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { AccesoModelo } from 'src/app/models/acceso.model';
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
  accesosModelo: AccesoModelo[] = [];
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
        this.accesosModelo = this.accesos;
      },
      (error) => {
        console.error('Error al mostrar los detalles', error);
      }
    );
  }

  filtrarDatos(): void {
    const filtros = this.filtroForm.value;
    this.controlaccesoService.list().subscribe(
      (resp: any) => {
        this.accesos = resp.filter((acceso: any) => {
          const fechaInicio = filtros.fechaInicio ? new Date(filtros.fechaInicio) : null;
          const fechaFin = filtros.fechaFin ? new Date(filtros.fechaFin) : null;
          const fechaEntrada = new Date(acceso.fechaEntrada);
  
          const cumpleAlmacen = filtros.almacen ? acceso.nombre_almacen.includes(filtros.almacen) : true;
          const cumpleFechaInicio = fechaInicio ? fechaEntrada >= fechaInicio : true;
          const cumpleFechaFin = fechaFin ? fechaEntrada <= fechaFin : true;
  
          return cumpleAlmacen && cumpleFechaInicio && cumpleFechaFin;
        });
              // Asignar los datos filtrados a accesosModelo
        this.accesosModelo = this.accesos;  // Asignar a accesosModelo si es lo que usas para generar el PDF
        console.log('Datos después del filtro:', this.accesos);  // Para depuración
      },
      (error) => {
        console.error('Error al mostrar los detalles filtrados', error);
      }
    );
  }
  
  limpiarFiltros(): void  {
    this.filtroForm.patchValue({
      almacen: '',
      fechaInicio: '',
      fechaFin: '',
    });
    this.getaccesos(); // Recargar todos los accesos originales
  }

  // Método para generar el PDF

  generarPdf() {
    const filtros = this.filtroForm.value;
    console.log('Filtros aplicados:', filtros);
  
    const accesosFiltrados = this.accesosModelo;
  
    const doc = new jsPDF();
  
    // Encabezado del PDF
    doc.setFontSize(16);
    doc.text('Informe de Acceso Vehicular a los Almacenes', 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 10, 20);
  
    let currentY = 30; // Posición inicial Y
  
    // Imprimir los datos
    accesosFiltrados.forEach((acceso: any, index: number) => {
      if (currentY > 270) { // Controlar el salto de página si el contenido excede el espacio
        doc.addPage();
        currentY = 20;
      }
  
      // Imprimir cada registro con formato
      doc.setFontSize(10);
      doc.text(`N°: ${index + 1}`, 10, currentY);
      currentY += 6;
      doc.text(`Almacén: ${acceso.nombre_almacen}`, 10, currentY);
      currentY += 6;
      doc.text(`Ubicación: ${acceso.ubicacion_almacen || 'No especificada'}`, 10, currentY);
      currentY += 6;
      doc.text(`Transportista: ${acceso.apellidos  || 'Sin descripción'}`, 10, currentY);
      currentY += 6;
      doc.text(`Auto Placa: ${ acceso.placa || 'N/A'}`, 10, currentY);
      currentY += 6;
      doc.text(`F. Entrada: ${acceso.fechaEntrada || 'N/A'}`, 10, currentY);
      currentY += 6;
      doc.text(`F. Salida: ${acceso.fechaSalida || 'N/A'}`, 10, currentY);
      currentY += 10; // Espaciado adicional entre registros
    });
  
    // Guardar el archivo
    doc.save('Informe_Acceso_Vehicular.pdf');
  }
}