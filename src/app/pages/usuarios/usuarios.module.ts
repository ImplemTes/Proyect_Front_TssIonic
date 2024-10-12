import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';
import {   ReactiveFormsModule } from '@angular/forms'; // Asegúrate de incluir ReactiveFormsModule
import { NgxPaginationModule } from 'ngx-pagination';
import { UsuariosPage } from './usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule, // Agrega manejo de paginaciones
    ReactiveFormsModule,
    IonicModule,
    UsuariosPageRoutingModule
  ],
  declarations: [UsuariosPage]
})
export class UsuariosPageModule {}
