import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-chat',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss']
})
export class ChatbotPage {
  userInput: string = '';
  messages: any[] = [];
  isLoading: boolean = false; 
  isLightTheme: boolean = true; 


  //PARA FECHAS:
  fechaInicioRegistro: string = '';
  fechaAsignada: boolean = false; // Controla si la fecha ya fue asignada
  constructor(
    private chatbotService: ChatbotService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Solo asigna la fecha si no ha sido asignada antes
        if (!this.fechaAsignada) {
          this.fechaInicioRegistro = this.getFechaActual();
          this.fechaAsignada = true; // Marca como asignada
        }
  }

  getFechaActual(): string {
    const ahora = new Date();
    const year = ahora.getFullYear();
    const month = String(ahora.getMonth() + 1).padStart(2, '0'); // Meses van de 0-11
    const day = String(ahora.getDate()).padStart(2, '0');
    const hours = String(ahora.getHours()).padStart(2, '0');
    const minutes = String(ahora.getMinutes()).padStart(2, '0');
    const seconds = String(ahora.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }


  // Método para enviar un mensaje
  sendMessage() {
    if (!this.userInput.trim()) return; // Evitar mensajes vacíos

    this.isLoading = true; // Mostrar indicador de carga
    this.addMessage(this.userInput, true); // Agregar mensaje del usuario
    const userMessage = this.userInput.trim(); // Limpiar espacios extra
    this.userInput = ''; // Limpiar el campo de entrada

    this.requestText(userMessage); // Enviar el mensaje al backend
  }

  // Método para hacer la solicitud a la API
  private requestText(message: string) {
    const data = {
      mensaje: message,
      fechaInicioRegistro: this.fechaInicioRegistro,  // Agregar this.
    };
    this.chatbotService.generateContent(data).subscribe(
      (response: any) => {
        response = this.formatText(response);
        this.addMessage(response, false);
        this.isLoading = false;
      },
      
      (error) => {
        console.error('Error al enviar el mensaje:', error);
        this.addMessage('Error al recibir respuesta del servidor', false);
        this.isLoading = false;
      }
    );
    this.fechaInicioRegistro = this.getFechaActual();
  }

  // Método para agregar un mensaje a la lista de mensajes
  private addMessage(text: string, isUser: boolean) {
    this.messages.push({ text, isUser });
  }

  // Método para formatear el texto con negritas y listas
  private formatText(text: string): string {
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Negrita
    text = text.replace(/\*\s(.*?)(\n|$)/g, '<li>$1</li>');       // Elementos de lista
    return text.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');        // Agrupar en <ul>
  }

  async clearMessages() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres borrar todos los mensajes?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Sí',
          handler: () => {this.messages = []; }
        }
      ]
    });
    await alert.present();
  }

  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
  }
  regresarventana(){
    this.router.navigate(['/home']);

  }
}
