import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apigemini = environment.geminiApiKey;
  private apiUrl = 'https://api.gemini.endpoint.com/query'; // Ajusta la URL de la API

  constructor(private http: HttpClient) {}

  sendMessageToGemini(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apigemini}`
    });
    const body = { query: message };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
