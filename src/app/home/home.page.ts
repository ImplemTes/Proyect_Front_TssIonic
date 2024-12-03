import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from '../app.component'; // Ajusta la ruta según tu estructura de carpetas
import { PageTitleService } from '../shared/page-title.service'; // Asegúrate de importar el servicio
import { Chart } from 'chart.js/auto';
import { ControlaccesoService } from 'src/app/services/controlacceso.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild('barCanvas', { static: true }) barCanvas!: ElementRef;
  barChart: any;
  filtroForm: FormGroup;
  public selectedPageTitle: string = 'Inicio'; 
  listaAlmacenes: any[] = [];
  constructor(
    private controlaccesoService: ControlaccesoService,
    private fb: FormBuilder,

  ) {  
    this.filtroForm = this.fb.group({
      fechaInicio: [''],
      fechaFin: [''],
    });
  }
  abrirPDF() {
    // Ruta del archivo PDF
    const rutaPDF = 'assets/docs/Manual.pdf';
    window.open(rutaPDF, '_blank');
  }

  isFieldInvalid(field: string): boolean {
    const control = this.filtroForm.get(field);
    return !!control && control.invalid && control.touched;
  }
  
  actualizargrafico(){
      console.log(this.filtroForm.value);
      if (this.filtroForm.valid) {
      this.controlaccesoService.ObtenerDatos(this.filtroForm.value).subscribe(
        (resp: any) => {
          this.listaAlmacenes = resp;
 
          console.log('Datos recibidos:', this.listaAlmacenes);
          // Si hay datos, cargar el gráfico
          if (this.listaAlmacenes.length > 0) {
            this.cargargrafico();
          }
        },
        (error) => {
          console.error('Error al obtener datos', error);
        }
      );   } else {
        console.error('Formulario inválido');
      }
  }
  cargargrafico() {
    const labels = this.listaAlmacenes.map(almacen => almacen.descripcion);
    const data = this.listaAlmacenes.map(almacen => almacen.cantidad);

    if (this.barChart) {
      this.barChart.destroy(); // Destruir gráfico anterior si existe
    }

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de Vehiculos accedidos por almacen', 
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          }
        },
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
