import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosEditPageRoutingModule } from './productos-edit-routing.module';

import { ProductosEditPage } from './productos-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, // Agrega para manejo de formularios con modal
    ProductosEditPageRoutingModule
  ],
  declarations: [ProductosEditPage]
})
export class ProductosEditPageModule {}
