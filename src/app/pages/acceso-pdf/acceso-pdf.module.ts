import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccesoPdfPageRoutingModule } from './acceso-pdf-routing.module';

import { AccesoPdfPage } from './acceso-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccesoPdfPageRoutingModule
  ],
  declarations: [AccesoPdfPage]
})
export class AccesoPdfPageModule {}
