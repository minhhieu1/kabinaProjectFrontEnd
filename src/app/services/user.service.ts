import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../services/rest.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private _restService: RestService) { }

  public getUserList() : Observable<Object> {
    let url = `${environment.kabinaAPI}` + '/control/users';
    return this.http.get(url);
  }
  public deleteUser(id:number) {
  let url = `${environment.kabinaAPI}` + '/control/del/' + id;
  return this._restService.deleteByUrl(url);
  }
  public addUser(user:UserModel) {
     let url = `${environment.kabinaAPI}` + '/control/add';
     return this._restService.postByUrl(url,user);
   }
   public editUser(user:UserModel) {
     let url = `${environment.kabinaAPI}` + '/control/update';
     return this._restService.patchByUrl(url,user);
   }
   public getBookingTempList() : Observable<Object> {
    let url = `${environment.kabinaAPI}` + '/control/bookingtemp/new';
    return this.http.get(url);
  }
  public getBookingTempListEdit() : Observable<Object> {
    let url = `${environment.kabinaAPI}` + '/control/bookingtemp/edit';
    return this.http.get(url);
  }
  public approveBooking(booking:any) {
    let url = `${environment.kabinaAPI}` + '/control/approve/' + booking.bookingId + "/false";
    return this._restService.postByUrl(url,booking);
  }
  public approveBookingEdit(booking:any) {
    let url = `${environment.kabinaAPI}` + '/control/approve/' + booking.bookingId + "/true";
    return this._restService.postByUrl(url,booking);
  }
  public rejectBooking(booking:any) {
    let url = `${environment.kabinaAPI}` + '/control/reject/' + booking.bookingId;
    console.log(url)
    return this._restService.deleteByUrl(url);
  }
}
