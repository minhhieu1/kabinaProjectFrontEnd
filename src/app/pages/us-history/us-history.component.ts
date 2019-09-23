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


  bookingHistory=[]
  currentUser: User;
  public bookingHistoryDraw = [];
  fillterBookingId:string = "";
  fillterShelfId:string = "";
  fillterStartDate:string = "";
  fillterEndDate:string = "";

  sortTable = {
    bookingId:true,
    shelfId:true,
    startDate:true,
    endDate:true
  }

  constructor(private BookingService: BookingService,private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
   }
  ngOnInit() {
    this.findUserBookingHistory();
    this.bookingHistoryDraw=this.bookingHistory;
  }
  

  findUserBookingHistory(){
    this.bookingHistory=this.BookingService.findUserBookingHistory(this.currentUser.userId);
  }

  fillter(){
    this.bookingHistoryDraw=this.bookingHistory.filter(booking=>{
      var bookingId=booking.bookingId+""
      var shelfId = booking.shelf.shelfId+"";
      var startDate = booking.startDate;
      var endDate = booking.endDate;
    
      return bookingId.includes(this.fillterBookingId)
      &&shelfId.includes(this.fillterShelfId)
      &&startDate.includes(this.fillterStartDate)
      &&endDate.includes(this.fillterEndDate)

    })
  }

  sort(event){
    var id=event.target.id;
    switch(id) { 
      case"bookingId": { 
        
          console.log(id)
          this.bookingHistoryDraw=this.bookingHistoryDraw.sort((a,b)=>{
            var bookinga=a.bookingId;
            var bookingb=b.bookingId
            return this.sortData(bookinga,bookingb,id);
            
          }
         )
        
         break; 
      } 

      case 'shelfId': { 
        console.log(id)
        this.bookingHistoryDraw=this.bookingHistoryDraw.sort((a,b)=>{
          var bookinga=a.shelf.shelfId;
          var bookingb=b.shelf.shelfId;
          return this.sortData(bookinga,bookingb,id)
          
        }
       )
      
       break; 
      } 

      case 'startDate': { 
        console.log(id)
        this.bookingHistoryDraw=this.bookingHistoryDraw.sort((a,b)=>{
          var bookinga=a.startDate;
          var bookingb=b.startDate;
          return this.sortData(bookinga,bookingb,id)
          
        }
       )
      
       break; 
      } 

      case 'endDate': { 
        console.log(id)
        this.bookingHistoryDraw=this.bookingHistoryDraw.sort((a,b)=>{
          var bookinga=a.endDate;
          var bookingb=b.endDate;
          return this.sortData(bookinga,bookingb,id)
          
        }
       )
      
       break; 
      } 
    
      default: { 
         //statements; 
         break; 
      } 
   } 
   this.sortTable[id] = !this.sortTable[id];
  }

  sortData(bookinga,bookingb,id){
     
      if(this.sortTable[id]){
        return (bookinga>bookingb)?1:((bookinga<bookingb)?-1:0)
      } else {
        return (bookinga<bookingb)?1:((bookinga>bookingb)?-1:0)
      }
      
    }
  
}
