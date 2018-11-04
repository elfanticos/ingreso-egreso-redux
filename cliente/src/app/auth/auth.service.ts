import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    url:string;
    constructor(
        public _httpClient: HttpClient,
    ) {
        this.url = 'localhost:3000/auth/';
    }

    loginGeneral(obj) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        return this._httpClient.post(`${this.url}login`, obj, {headers : headers});
    }

}
