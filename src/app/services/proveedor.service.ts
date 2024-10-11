import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = environment.apiUrl + "/api/proveedor";
  constructor(
    private http: HttpClient
  ) { }
    // Listar todos
  list(): Observable<any> {
      return this.http.get(`${this.apiUrl}/`);
   }

     // Crear un nuevo cliente
  /*
  create(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, user);
  }
*/
}
