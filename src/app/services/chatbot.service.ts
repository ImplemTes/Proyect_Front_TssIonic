// chatbot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly baseUrl = environment.geminiBaseUrl;
  private readonly apiKey = environment.geminiApiKey;

  constructor(private http: HttpClient) {}

  // Método para generar contenido de texto
  public generateContent(message: string): Observable<any> {
    const url = `${this.baseUrl}${environment.geminiModelEndpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('key', this.apiKey);
    const body = { contents: [{ parts: [{ text: message }] }] };

    return this.http.post(url, body, { headers, params })
      .pipe(
        timeout(environment.geminiTimeout),
        catchError(error => {
          console.error('Error al comunicarse con la API de Gemini:', error);
          return throwError(error);
        })
      );
  }

}
