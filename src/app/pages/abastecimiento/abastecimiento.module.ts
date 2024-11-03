import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbastecimientoPageRoutingModule } from './abastecimiento-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AbastecimientoPage } from './abastecimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule, // Agrega manejo de paginaciones
    ReactiveFormsModule, // Agrega para manejo de formularios con modal
    IonicModule,
    AbastecimientoPageRoutingModule
  ],
  declarations: [AbastecimientoPage]
})
export class AbastecimientoPageModule {}
