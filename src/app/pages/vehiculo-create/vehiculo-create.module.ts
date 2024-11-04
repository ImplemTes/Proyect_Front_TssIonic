import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiculoCreatePageRoutingModule } from './vehiculo-create-routing.module';

import { VehiculoCreatePage } from './vehiculo-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiculoCreatePageRoutingModule
  ],
  declarations: [VehiculoCreatePage]
})
export class VehiculoCreatePageModule {}
