import { AuthenticationService } from './../../services/authentication.service';
import { User } from 'src/app/models/user';
import { BookingService } from './../../services/booking.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-us-booking',
  templateUrl: './us-booking.component.html',
  styleUrls: ['./us-booking.component.scss']
})
export class UsBookingComponent implements OnInit {

  chooseForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private BookingService: BookingService,
    private authenticationService: AuthenticationService, ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }
  minMax = {
    min: '',
    max: ''
  };
  bookingData = [];
  alertDate: boolean = false;
  currentUser: User;
  bookingUnApprove = [];
  unApprove=false;

  ngOnInit() {
    this.getStarAndEnd();
    this.getUserBookingUnapprove();
    this.chooseForm = this.formBuilder.group({
      startDate: [this.minMax.min],
      endDate: [this.minMax.max],
    });
  }
  getStarAndEnd() {
    let obj = this.BookingService.getStartAndEnd();
    this.minMax.min = obj['min'];
    this.minMax.max = obj['max'];
  }
  getUserBookingUnapprove(){
    this.bookingUnApprove = this.BookingService.findUserBookingUnapprove(this.currentUser.userId);
  }
  onSubmit() {
    this.alertDate = this.BookingService.checkStart_EndDateInput(this.chooseForm.value.startDate, this.chooseForm.value.endDate);
    if (!this.alertDate) {
      this.bookingData = this.BookingService.getShelfInRange(this.chooseForm.value.startDate, this.chooseForm.value.endDate, this.currentUser.business.unitId);
    }
  }
  chooseShelf(event){
    var id = event.target.id;
    var retVal = confirm("Do you want book the sheld with id " + event.target.id + " from " + this.chooseForm.value.startDate + " to " + this.chooseForm.value.endDate + "?");
    if (retVal === true) {
      this.BookingService.sendBookingRequest(this.currentUser.userId, id, this.chooseForm.value.startDate, this.chooseForm.value.endDate);
    } else {
      console.log("Cancel booking");
    }
  }

}
