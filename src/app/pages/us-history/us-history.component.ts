import { AuthenticationService } from './../../services/authentication.service';
import { User } from 'src/app/models/user';
import { BookingService } from './../../services/booking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-us-history',
  templateUrl: './us-history.component.html',
  styleUrls: ['./us-history.component.scss']
})
export class UsHistoryComponent implements OnInit {

  constructor(private BookingService: BookingService,private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
   }
  ngOnInit() {
    this.findUserBookingHistory();
  }
  bookingHistory=[]
  currentUser: User;

  findUserBookingHistory(){
    this.bookingHistory=this.BookingService.findUserBookingHistory(this.currentUser.userId);
  }
}
