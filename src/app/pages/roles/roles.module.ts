import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { RolesPageRoutingModule } from './roles-routing.module';

import { RolesPage } from './roles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule, // Agrega manejo de paginaciones
    ReactiveFormsModule, // Agrega para manejo de formularios con modal
    IonicModule,
    RolesPageRoutingModule
  ],
  declarations: [RolesPage]
})
export class RolesPageModule {}
