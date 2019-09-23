import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BookingService } from './booking.service';


@Injectable({
  providedIn: 'root'
})
export class BookingHistoryService {


  private baseUrl = 'http://localhost:8080/kabina/api/history/';

  constructor(private http: HttpClient, private bookingService:BookingService) { }

  findAllBookingHistory() {

    let bookingHistory = [];
    this.http.get(this.baseUrl + 'findAllBookingHistory').subscribe((data)=>{
     
      for(let key in data){

        var start = new Date(data[key]['startDate']);
        var end = new Date(data[key]['endDate'])
        data[key]['startDate'] = this.bookingService.formatDateToString(start);
        data[key]['endDate'] = this.bookingService.formatDateToString(end);

        bookingHistory.push(data[key]);
      }
      
    })
    return bookingHistory;
  }
}
