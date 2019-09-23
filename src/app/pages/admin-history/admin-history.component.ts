import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingHistoryService } from 'src/app/services/booking-history.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.scss']
})
export class AdminHistoryComponent implements OnInit {

  public bookingHistory = [];
  public bookingHistoryDraw = [];
  fillterBookingId:string = "";
  fillterUserId:string = "";
  fillterShelfId:string = "";
  fillterStartDate:string = "";
  fillterEndDate:string = "";
  fillterExpire:string = "";

  sortTable = {
    bookingId:true,
    userId:true,
    shelfId:true,
    startDate:true,
    endDate:true,
    expire:true
  }


  constructor(public bookingHistoryService:BookingHistoryService) { 
  }

  ngOnInit() {    
   this.getAllBookingHistory();

  }

  
  getAllBookingHistory(){
    this.bookingHistory = this.bookingHistoryService.findAllBookingHistory();
    this.bookingHistoryDraw=this.bookingHistory;
  }

 

  fillter(){
    console.log(this.fillterShelfId)
    this.bookingHistoryDraw=this.bookingHistory.filter(booking=>{
      var bookingId=booking.bookingId+""
      var shelfId = booking.shelf.shelfId+"";
      var userId = booking.user.userId+"";
      var startDate = booking.startDate;
      var endDate = booking.endDate;
      var expire = booking.expire+'';
     
      return bookingId.includes(this.fillterBookingId)
      &&shelfId.includes(this.fillterShelfId)
      &&startDate.includes(this.fillterStartDate)
      &&endDate.includes(this.fillterEndDate)
      &&expire.includes(this.fillterExpire)
      &&userId.includes(this.fillterUserId)
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
      case 'userId': { 
        console.log(id)
        this.bookingHistoryDraw=this.bookingHistoryDraw.sort((a,b)=>{
          var bookinga=a.user.userId;
          var bookingb=b.user.userId
          return this.sortData(bookinga,bookingb,id)
          
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

      case 'expire': { 
        console.log(id)
        this.bookingHistoryDraw=this.bookingHistoryDraw.sort((a,b)=>{
          var bookinga=a.expire;
          var bookingb=b.expire;
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
