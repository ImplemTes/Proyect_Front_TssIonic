import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss']
})
export class ChatbotPage {
  userInput: string = '';
  messages: any[] = [];
  isLoading: boolean = false; // Control para bloquear los botones
  isLightTheme: boolean = true; // Control para el tema

  constructor(private chatbotService: ChatbotService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.isLoading = true; // Bloquea los botones
    this.messages.push({ text: this.userInput, isUser: true });
    const userMessage = this.userInput;
    this.userInput = '';

    this.chatbotService.sendMessageToGemini(userMessage).subscribe(
      (response) => {
        this.messages.push({ text: response.data, isUser: false });
        this.isLoading = false; // Desbloquea los botones
      },
      (error) => {
        console.error('Error al enviar el mensaje:', error);
        this.isLoading = false; // Desbloquea los botones
      }
    );
  }

  clearMessages() {
    this.messages = [];
  }

  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
  }
}
