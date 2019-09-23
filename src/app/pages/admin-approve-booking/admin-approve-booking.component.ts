import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { BookingService } from './../../services/booking.service';

@Component({
  selector: 'app-admin-approve-booking',
  templateUrl: './admin-approve-booking.component.html',
  styleUrls: ['./admin-approve-booking.component.scss']
})
export class AdminApproveBookingComponent implements OnInit {
  public bookingTempList:any;
  constructor(private _userService: UserService, private bookingService: BookingService) { }
  config: any;
  public configModal: any;
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  ngOnInit() {
    this.getBookingTemps();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
    };
  }
  getBookingTemps() {
    this._userService.getBookingTempList().subscribe(
      data => {
        console.log(data)
        for (var key in data){
          var start=new Date(data[key]['startDate'])
          var end=new Date(data[key]['endDate'])
          data[key]['startDate']= this.bookingService.formatDateToString(start)
          data[key]['endDate']= this.bookingService.formatDateToString(end)
        }
        this.bookingTempList = data;
      },
      err => {
        alert(err);
      });
  }
  approve(booking:any){
    this._userService.approveBooking(booking).subscribe(
      data => {
        this.getBookingTemps();
      },
      err => {
        alert(err);
      });;
      this.getBookingTemps();
  }
  reject(booking:any){
    this._userService.rejectBooking(booking).subscribe(
      data => {
        this.getBookingTemps();
      },
      err => {
        alert(err);
      });;
      this.getBookingTemps();
  }
}
