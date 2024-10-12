import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';
import {   ReactiveFormsModule } from '@angular/forms'; // Asegúrate de incluir ReactiveFormsModule

import { UsuariosPage } from './usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UsuariosPageRoutingModule
  ],
  declarations: [UsuariosPage]
})
export class UsuariosPageModule {}
