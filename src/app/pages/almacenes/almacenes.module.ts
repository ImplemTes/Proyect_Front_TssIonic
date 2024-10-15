import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlmacenesPageRoutingModule } from './almacenes-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlmacenesPage } from './almacenes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule, // Agrega manejo de paginaciones
    ReactiveFormsModule, // Agrega para manejo de formularios con modal
    IonicModule,
    AlmacenesPageRoutingModule
  ],
  declarations: [AlmacenesPage]
})
export class AlmacenesPageModule {}
