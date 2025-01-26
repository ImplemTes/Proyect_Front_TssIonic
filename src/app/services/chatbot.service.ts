// chatbot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = environment.apiUrl + '/api/vehiculo';
  constructor(private http: HttpClient) {}

  //metodo para enviar texto a mi api 
  generateContent(mensaje: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/geminix/`, mensaje);
  }

}
