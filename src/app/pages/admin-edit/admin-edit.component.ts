import { Component, OnInit } from '@angular/core';
import { BookingUpdateService } from 'src/app/services/booking-update.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {

  // Edit
  minMax = {
    min: '',
    max: ''
  };
  alertDate: boolean = false;
  alertEndDate: boolean = false;
  editStartDate: boolean = false;
  alertRange: boolean = false;
  booklistUpdate = {};
  visibleEdit: boolean;



  // Filter
  public bookingEdit = [];
  public bookingEditDraw = [];
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



  constructor(private BookingService: BookingService,public bookingUpdateService:BookingUpdateService) { }

  ngOnInit() {
    this.getAllBookingEdit();
    console.log(this.bookingEditDraw)
    console.log(this.bookingEdit)

    this.getStarAndEnd();
  }

  getStarAndEnd() {
    let obj = this.BookingService.getStartAndEnd();
    this.minMax.min = obj['min'];
    this.minMax.max = obj['max'];
  }

  getAllBookingEdit(){
    this.bookingEdit = this.bookingUpdateService.findAllBookingEdit();
    this.bookingEditDraw=this.bookingEdit;
  }



  

  fillter(){
    console.log(this.fillterShelfId)
    this.bookingEditDraw=this.bookingEdit.filter(booking=>{
      var bookingId=booking.bookingId+""
      var shelfId = booking.shelf.shelfId+"";
      var userId = booking.user.userId+"";
      var startDate = booking.startDate;
      var endDate = booking.endDate;
      var startDate = booking.startDate;
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
          this.bookingEditDraw=this.bookingEditDraw.sort((a,b)=>{
            var bookinga=a.bookingId;
            var bookingb=b.bookingId
            return this.sortData(bookinga,bookingb,id);
            
          }
         )
        
         break; 
      } 
      case 'userId': { 
        console.log(id)
        this.bookingEditDraw=this.bookingEditDraw.sort((a,b)=>{
          var bookinga=a.user.userId;
          var bookingb=b.user.userId
          return this.sortData(bookinga,bookingb,id)
          
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

      case 'expire': { 
        console.log(id)
        this.bookingEditDraw=this.bookingEditDraw.sort((a,b)=>{
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
      
      this.booklistUpdate = this.getBookingEditByBookingId(id);
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
    let startDate = new Date(this.booklistUpdate['startDate']);
    let minDate = new Date(this.minMax.min);
    if(startDate > minDate){
      this.editStartDate = true;
      
    } else {
      this.editStartDate = false;
    }

    
  }


  deleteAlert(){
    this.alertEndDate=false;
    this.alertDate=false;
    this.alertRange = false;
  }


  updateBookingEdit(){

    this.deleteAlert();

    console.log(this.bookingEdit);

    let startDate = new Date(this.booklistUpdate['startDate']);
    let endDate = new Date(this.booklistUpdate['endDate']);
    
    this.alertDate = (startDate > endDate) ? true : false;

    var start=startDate.getDay();
    var end=endDate.getDay();
    var map=[];


    if(!this.alertDate) {
      this.bookingUpdateService.getBookingByShelfId(this.booklistUpdate['shelf']['shelfId']).toPromise().then(
        (data) => {

          map=data[this.booklistUpdate['shelf']['shelfId']];
          console.log(map)
        }
      ).then(()=>{

        for(let i=start-1; i<=end-1; i++){
          if(map[i]!=this.booklistUpdate['user']['userId']&&map[i]!=''){
            return false;
          }
        }
        return true;
      }).then((validate)=>{


        if(!validate){
          this.alertEndDate=true;
        } else{

          var mapUser = []
          this.bookingUpdateService.getBookingByUserId(this.booklistUpdate['user']['userId'],this.booklistUpdate['bookingId'])
          .toPromise().then(
            (data) => {
    
              mapUser=data[this.booklistUpdate['user']['userId']];
              console.log(mapUser)
            }
          ).then(()=>{

            for(let i=start-1; i<=end-1; i++){
              if(mapUser[i]==this.booklistUpdate['user']['userId']){
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

                this.bookingUpdateService.updateBooking(
                  this.booklistUpdate['bookingId'],
                  this.booklistUpdate['startDate'],
                  this.booklistUpdate['endDate']
                  )
                .subscribe((data) => {
                  if(data){
                    alert('Suscess!')
                    this.getAllBookingEdit();
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
