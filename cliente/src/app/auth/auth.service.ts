import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Params } from '@angular/router';
@Injectable()
export class AuthService {
    url:string;
    constructor(
        public _httpClient: HttpClient,
    ) {
        this.url = 'http://localhost:3000/auth/';
    }

    login(params:HttpParams) : Observable<any> {
        return this._httpClient.get(`${this.url}login`, {params : params});
    }


}
