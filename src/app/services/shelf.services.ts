// Writed by Chi
// All serve for table components 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class ShelfServices {
  constructor(private http: HttpClient) { }

  // getUser(userId: number){ 
  //   let url = `${environment.api}/users/${userId}`;
  //   return this.http.get(url);
  // }

  getShelfList(unitId, role) {
    if(role=='Admin'){
      return this.http.get(`${environment.api}/getMapShelfAdmin`)
    }
    else {
      return this.http.get(`${environment.api}/getMapShelfFromUnit?unitId=` + unitId)
    }
    
  }
}