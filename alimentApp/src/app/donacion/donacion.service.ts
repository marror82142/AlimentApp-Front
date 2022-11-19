import { Injectable } from '@angular/core';
import {of, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { donacion } from '../donacion/donacion';


@Injectable({
  providedIn: 'root'
})
export class donacionService {
  private endpointUrl = 'http://localhost:8080/api/donacion';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient ) { }

  createDonacion(donacion: donacion): Observable<donacion>{
    return this.http.post<donacion>((this.endpointUrl), donacion, {headers: this.httpHeaders});
  }
  
}
