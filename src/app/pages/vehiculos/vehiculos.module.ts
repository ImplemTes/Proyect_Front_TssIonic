import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiculosPageRoutingModule } from './vehiculos-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { VehiculosPage } from './vehiculos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule, // Agrega manejo de paginaciones
    IonicModule,
    VehiculosPageRoutingModule
  ],
  declarations: [VehiculosPage]
})
export class VehiculosPageModule {}
