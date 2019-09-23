import { Injectable } from '@angular/core';
import { BookingService } from './booking.service';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BookingUpdateService {
  
  
  

  private baseUrl = 'http://localhost:8080/kabina/api/update/';

  constructor(private http: HttpClient, private bookingService:BookingService) { }

  findAllBookingEdit() {

    let bookingEdit = [];
    this.http.get(this.baseUrl + 'findAllBookingEdit').subscribe((data)=>{
     
      for(let key in data){

        var start = new Date(data[key]['startDate']);
        var end = new Date(data[key]['endDate'])
        data[key]['startDate'] = this.bookingService.formatDateToString(start);
        data[key]['endDate'] = this.bookingService.formatDateToString(end);

        bookingEdit.push(data[key]);
      }
      
    })
    return bookingEdit;
  }

  deleteBookingByBookingId(bookingId:string){

    // let param = new HttpParams();
    // param.set('bookingId',bookingId)

    let formData: FormData = new FormData(); 
    formData.append('bookingId', bookingId); 
    return this.http.post(this.baseUrl + 'deleteBookingEdit',formData);
  }

  getBookingByShelfId(shelfId:string) {

    let formData: FormData = new FormData(); 
    formData.append('shelfId', shelfId); 
    return this.http.post(this.baseUrl + 'getBookingByShelfId',formData);
  }

  getBookingByUserId(userId:string,bookingId:string) {

    let formData: FormData = new FormData(); 
    formData.append('bookingId', bookingId); 
    formData.append('userId', userId); 
    return this.http.post(this.baseUrl + 'getBookingByUserId',formData);
  }

  insertBookingTemp(bookingId:string,userId:string,shelfId:string,startDate:string,endDate:string) {


      let formData: FormData = new FormData(); 
      formData.append('bookingId', bookingId); 
      formData.append('userId', userId); 
      formData.append('shelfId', shelfId); 
      formData.append('startDate', startDate); 
      formData.append('endDate', endDate); 

      console.log(bookingId)
      console.log(userId)
      console.log(shelfId)
      console.log(startDate)
      console.log(endDate)
    return this.http.post(this.baseUrl + 'insertBookingTemp',formData);
  }

  updateBooking(bookingId: string, startDate: string, endDate: string) {
    let formData: FormData = new FormData(); 
      formData.append('bookingId', bookingId); 
      formData.append('startDate', startDate); 
      formData.append('endDate', endDate); 

      return this.http.post(this.baseUrl + 'updateBooking',formData);
  }
  
}
