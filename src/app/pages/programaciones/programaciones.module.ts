import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProgramacionesPageRoutingModule } from './programaciones-routing.module';

import { ProgramacionesPage } from './programaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule, // Agrega manejo de paginaciones
    ReactiveFormsModule, // Agrega para manejo de formularios con modal
    IonicModule,
    ProgramacionesPageRoutingModule
  ],
  declarations: [ProgramacionesPage]
})
export class ProgramacionesPageModule {}
