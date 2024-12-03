import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformesPageRoutingModule } from './informes-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { InformesPage } from './informes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule, // Agrega manejo de paginaciones
    ReactiveFormsModule, // Agrega para manejo de formularios con modal
    IonicModule,
    InformesPageRoutingModule
  ],
  declarations: [InformesPage]
})
export class InformesPageModule {}
