import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageTitleService } from './shared/page-title.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home-outline' },
    { title: 'Usuarios', url: '/home/usuarios', icon: 'person-circle-outline' },
    { title: 'Clientes', url: '/home/clientes', icon: 'people-circle-outline' },
    { title: 'Proveedores', url: '/home/proveedores', icon: 'briefcase-outline' },
    { title: 'Almacenes', url: '/home/almacenes', icon: 'cube-outline' },
    { title: 'Productos', url: '/home/productos', icon: 'cube-outline' }, 
    //falta completar
   { title: 'Vehículos', url: '/home/vehiculos', icon: 'car-sport-outline' },
    { title: 'Abastecimiento', url: '/home/abastecimiento', icon: 'cart-outline' }, 
    { title: 'Informes', url: '/home/informes', icon: 'analytics-outline' }
  ]

  constructor(private router: Router, private pageTitleService: PageTitleService) {}

  updatePageTitle(title: string) {
    this.pageTitleService.changeTitle(title);
  }

}
