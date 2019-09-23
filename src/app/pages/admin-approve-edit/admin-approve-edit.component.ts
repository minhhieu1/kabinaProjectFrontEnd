import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { BookingService } from './../../services/booking.service';

@Component({
  selector: 'app-admin-approve-edit',
  templateUrl: './admin-approve-edit.component.html',
  styleUrls: ['./admin-approve-edit.component.scss']
})
export class AdminApproveEditComponent implements OnInit {
  public bookingTempListEdit:any;

  constructor(private _userService: UserService, private bookingService: BookingService) { }

  ngOnInit() {
    this.getBookingTempsEdit();
  }
  getBookingTempsEdit() {
    this._userService.getBookingTempListEdit().subscribe(
      data => {
        console.log(data)
        for (var key in data){
          var start=new Date(data[key]['startDate'])
          var end=new Date(data[key]['endDate'])
          data[key]['startDate']= this.bookingService.formatDateToString(start)
          data[key]['endDate']= this.bookingService.formatDateToString(end)
        }
        this.bookingTempListEdit = data;
      },
      err => {
        alert(err);
      });
  }
  approve(booking:any){
    this._userService.approveBooking(booking).subscribe(
      data => {
        this.getBookingTempsEdit();
      },
      err => {
        alert(err);
      });;
      this.getBookingTempsEdit();
  }
  reject(booking:any){
    this._userService.rejectBooking(booking).subscribe(
      data => {
        this.getBookingTempsEdit();
      },
      err => {
        alert(err);
      });;
      this.getBookingTempsEdit();
  }
}
