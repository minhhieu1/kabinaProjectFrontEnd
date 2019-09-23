import { User } from './../../models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BookingService } from './../../services/booking.service';

@Component({
  selector: 'app-admin-booking',
  templateUrl: './admin-booking.component.html',
  styleUrls: ['./admin-booking.component.scss']
})
export class AdminBookingComponent implements OnInit {
  chooseForm: FormGroup;
  minMax = {
    min: '',
    max: ''
  };
  bookingData = [];
  alertDate: boolean = false;
  currentUser: User;
  constructor(private formBuilder: FormBuilder,  private BookingService: BookingService,private authenticationService: AuthenticationService) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.getStarAndEnd();
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
  onSubmit() {
    this.alertDate = this.BookingService.checkStart_EndDateInput(this.chooseForm.value.startDate, this.chooseForm.value.endDate);
    if (!this.alertDate) {
      this.bookingData=this.BookingService.getShelfAdmin(this.chooseForm.value.startDate, this.chooseForm.value.endDate);
    }
  }
  chooseShelf(event){
    var id = event.target.id;
    var retVal = confirm("Do you want book the sheld with id " + event.target.id + " from " + this.chooseForm.value.startDate + " to " + this.chooseForm.value.endDate + "?");
    if (retVal === true) {
      this.BookingService.sendBookingRequestAdmin(this.currentUser.userId, id, this.chooseForm.value.startDate, this.chooseForm.value.endDate)
      .toPromise()
      .then(function (response) {// success is deprecated, use then instead
        if (response == 1) {
          alert("Yay. Success  :))))))");
        }else{
          alert("Something wrong. Please try again :(((((");
        }
        return response;
      })
      .then((response)=>{
        if (response == 1) {
          this.bookingData=this.bookingData.filter(booking=>{
            return booking.shelfId!=id;
          })
        }
      })
      .catch(function (error) {   // use catch instead of error
        alert("Something wrong. Please try again :(((((");
      })
      
    } else {
      console.log("Cancel booking");
    }
  }

}
