import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlaccesoPageRoutingModule } from './controlacceso-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ControlaccesoPage } from './controlacceso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule, // Agrega manejo de paginaciones
    ReactiveFormsModule, // Agrega para manejo de formularios con modal
    IonicModule,
    ControlaccesoPageRoutingModule
  ],
  declarations: [ControlaccesoPage]
})
export class ControlaccesoPageModule {}
