import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ChatbotPageRoutingModule } from './chatbot-routing.module';

import { ChatbotPage } from './chatbot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule ,
    IonicModule,
    ChatbotPageRoutingModule
  ],
  declarations: [ChatbotPage]
})
export class ChatbotPageModule {}
