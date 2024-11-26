import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlaccesoCreatePageRoutingModule } from './controlacceso-create-routing.module';

import { ControlaccesoCreatePage } from './controlacceso-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Agrega para manejo de formularios con modal
    IonicModule,
    ControlaccesoCreatePageRoutingModule
  ],
  declarations: [ControlaccesoCreatePage]
})
export class ControlaccesoCreatePageModule {}
