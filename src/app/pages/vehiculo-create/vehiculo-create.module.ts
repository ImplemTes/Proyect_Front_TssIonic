import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiculoCreatePageRoutingModule } from './vehiculo-create-routing.module';

import { VehiculoCreatePage } from './vehiculo-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Agrega para manejo de formularios con modal
    IonicModule,
    VehiculoCreatePageRoutingModule
  ],
  declarations: [VehiculoCreatePage]
})
export class VehiculoCreatePageModule {}
