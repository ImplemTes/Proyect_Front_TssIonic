import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosCreatePageRoutingModule } from './productos-create-routing.module';

import { ProductosCreatePage } from './productos-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Agrega para manejo de formularios con modal
    IonicModule,
    ProductosCreatePageRoutingModule
  ],
  declarations: [ProductosCreatePage]
})
export class ProductosCreatePageModule {}
