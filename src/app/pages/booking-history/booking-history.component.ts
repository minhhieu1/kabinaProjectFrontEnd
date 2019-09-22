import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { BookingService } from '../../services/booking.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {
  datas:Array<any>  
  currentUser: User;

  constructor(private bookingService: BookingService, private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.bookingService.getBookingList(this.currentUser.userId).subscribe((bookings : any[])=>{ 
        this.datas = bookings;
        console.log(bookings);
    });
  }
}
