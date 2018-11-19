import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string;
  constructor(
    public _httpClient: HttpClient,
    private _router:Router
  ) {
    this.url = 'http://localhost:3000/auth/';
  }

  crearUsuario(data:any):void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this._httpClient.post(this.url+'crearUsuario',data, { headers: headers }).subscribe(create => {
    },err => {
      console.log('error', err.error);
    });
  }
}
