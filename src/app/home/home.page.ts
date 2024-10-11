import { Component } from '@angular/core';
import { AppComponent } from '../app.component'; // Ajusta la ruta según tu estructura de carpetas
import { PageTitleService } from '../shared/page-title.service'; // Asegúrate de importar el servicio


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public selectedPageTitle: string = 'Inicio'; // Inicialización aquí

  constructor(private pageTitleService: PageTitleService) {
    // Aquí puedes configurar cualquier lógica inicial si es necesario
  }

}
