import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';// Asegúrate de incluir ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { ProveedoresPageRoutingModule } from './proveedores-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProveedoresPage } from './proveedores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule, // Agrega manejo de paginaciones
    ReactiveFormsModule, // Agrega para manejo de formularios con modal
    IonicModule,
    ProveedoresPageRoutingModule
  ],
  declarations: [ProveedoresPage]
})
export class ProveedoresPageModule {}
