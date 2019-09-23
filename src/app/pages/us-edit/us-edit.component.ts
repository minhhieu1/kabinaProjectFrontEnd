import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { BookingService } from 'src/app/services/booking.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookingUpdateService } from 'src/app/services/booking-update.service';


@Component({
  selector: 'app-us-edit',
  templateUrl: './us-edit.component.html',
  styleUrls: ['./us-edit.component.scss']
})
export class UsEditComponent implements OnInit {

  // Edit
  minMax = {
    min: '',
    max: ''
  };
  alertDate: boolean = false;
  alertEndDate: boolean = false;
  editStartDate: boolean = false;
  alertRange: boolean = false;
  bookingUpdate = {};
  visibleEdit: boolean;


  // Filter
  bookingEdit=[]
  currentUser: User;
  public bookingEditDraw = [];
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
  

  constructor(private BookingService: BookingService,public bookingUpdateService:BookingUpdateService,private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
   }

   ngOnInit() {
    this.getAllBookingEdit();

    console.log(this.bookingEdit)
    this.getStarAndEnd();
   
  }


  deleteAlert(){
    this.alertEndDate=false;
    this.alertDate=false;
    this.alertRange = false;
  }


  getStarAndEnd() {
    let obj = this.BookingService.getStartAndEnd();
    this.minMax.min = obj['min'];
    this.minMax.max = obj['max'];
  }


  getAllBookingEdit(){
    this.bookingEdit = this.BookingService.findUserBookingEdit(this.currentUser.userId);
    this.bookingEditDraw=this.bookingEdit;
  }

  fillter(){
    console.log(this.fillterShelfId)
    this.bookingEditDraw=this.bookingEdit.filter(booking=>{
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
          this.bookingEditDraw=this.bookingEditDraw.sort((a,b)=>{
            var bookinga=a.bookingId;
            var bookingb=b.bookingId
            return this.sortData(bookinga,bookingb,id);
            
          }
         )
        
         break; 
      } 
      case 'shelfId': { 
        console.log(id)
        this.bookingEditDraw=this.bookingEditDraw.sort((a,b)=>{
          var bookinga=a.shelf.shelfId;
          var bookingb=b.shelf.shelfId;
          return this.sortData(bookinga,bookingb,id)
          
        }
       )
      
       break; 
      } 

      case 'startDate': { 
        console.log(id)
        this.bookingEditDraw=this.bookingEditDraw.sort((a,b)=>{
          var bookinga=a.startDate;
          var bookingb=b.startDate;
          return this.sortData(bookinga,bookingb,id)
          
        }
       )
      
       break; 
      } 

      case 'endDate': { 
        console.log(id)
        this.bookingEditDraw=this.bookingEditDraw.sort((a,b)=>{
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


    deleteBookingEdit(event){
      let id = event.target.id;
      if(confirm("Are you sure ?")){

        this.bookingUpdateService.deleteBookingByBookingId(id).subscribe((data)=>{
          if(data){
            alert('Successful!')
            this.getAllBookingEdit();
          } else {
            alert('Delete Error!')
          }
        })
      }
    }

    changmyModalData(event){

      this.deleteAlert();

      let id = event.target.id;
      
      this.bookingUpdate = this.getBookingEditByBookingId(id);
      this.checkeditStartDate();
      this.toggle();

      
    }
  

    toggle(){  
      this.visibleEdit = !this.visibleEdit;
    }


    getBookingEditByBookingId(bookingId:number){
      return Object.assign({},this.bookingEdit.find((booking)=>{
        return booking.bookingId == bookingId;
      }))
    }

    checkeditStartDate(){
      let startDate = new Date(this.bookingUpdate['startDate']);
      let minDate = new Date(this.minMax.min);
      if(startDate > minDate){
        this.editStartDate = true;
        
      } else {
        this.editStartDate = false;
      }
    }

    updateBookingEdit(){

      this.deleteAlert();

      console.log(this.bookingEdit);

      let startDate = new Date(this.bookingUpdate['startDate']);
      let endDate = new Date(this.bookingUpdate['endDate']);
      
      this.alertDate = (startDate > endDate) ? true : false;

      var start=startDate.getDay();
      var end=endDate.getDay();
      var map=[];


      if(!this.alertDate) {
        this.bookingUpdateService.getBookingByShelfId(this.bookingUpdate['shelf']['shelfId']).toPromise().then(
          (data) => {

            map=data[this.bookingUpdate['shelf']['shelfId']];
            console.log(map)
          }
        ).then(()=>{

          for(var i=start-1; i<=end-1; i++){
            if(map[i]!=this.bookingUpdate['user']['userId']&&map[i]!=''){
              return false;
            }
          }
          return true;
        }).then((validate)=>{


          if(!validate){
            this.alertEndDate=true;
          } else{
            
            var mapUser = []
            this.bookingUpdateService.getBookingByUserId(this.bookingUpdate['user']['userId'],this.bookingUpdate['bookingId'])
            .toPromise().then(
              (data) => {
      
                mapUser=data[this.bookingUpdate['user']['userId']];
                console.log(mapUser)
              }
            ).then(()=>{
  
              for(let i=start-1; i<=end-1; i++){
                if(mapUser[i]==this.bookingUpdate['user']['userId']){
                  return false;
                }
              }
              return true;
  
            })
            .then((validate)=>{
  
  
              if(!validate){
                this.alertRange=true;
              } else{
  
                if (confirm("Are you sure ?")) {
  
                  this.bookingUpdateService.insertBookingTemp(
                    this.bookingUpdate['bookingId'],
                    this.bookingUpdate['user']['userId'],
                    this.bookingUpdate['shelf']['shelfId'],
                    this.bookingUpdate['startDate'],
                    this.bookingUpdate['endDate']
                    
                    )
                  .subscribe((data) => {
                    if(data){
                      alert('Suscess!')
                      this.toggle()
                    } else {
                      alert('Error!')
                    }
                  })
      
                }
              }
  
  
            })
          }
        })
  
      }
    }
  
  
  }
  