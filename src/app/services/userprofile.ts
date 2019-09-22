import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class UserProfile{

    constructor(
        private http: HttpClient,
    ){}

    getUserInfo(userId) {
        return this.http.get(`${environment.api}/usersProfile/${userId}`);
    } 
}