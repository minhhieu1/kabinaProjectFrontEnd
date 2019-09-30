import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShelfServices } from 'src/app/services/shelf.services';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  userObject: any;
  currentUser: User;
  shelves: any;
  searchForm: FormGroup;
  submitted = false;
  shelfElementSelected: any;
  numShelfClick: any;
  //shelfElementClicked:any;
  shelfObjectClicked: any;
  //Phan moi them
  shelfDetail: any;
  shelfStatus: any;
  shelfStatusForDraw: any;
  shelf= {'shelfId': '', 'detail': [], 'status': -1};


  constructor(
    private formBuilder: FormBuilder,
    private shelfServices: ShelfServices,
    private authenticationService: AuthenticationService,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      keyword: '',
    });
    this.getData()
  }


  getData() {
    this.shelfServices.getShelfList(this.currentUser.business.unitId, this.currentUser.role.roleName).subscribe(
      data => {
        let detail = {};
        let status = [];
        for (var key in data) {
          let rawDetail = data[key]['Detail'];
          let rawStatus = data[key]['Status'];
          for(var key in rawDetail){
            detail[key]={'detail': rawDetail[key],'shelfId': key}
          }
          for(var key in rawStatus){
            status.push({'shelfId': key, 'value': rawStatus[key]})
            detail[key]['status']=rawStatus[key];
          }
        }
        this.shelfStatus = status;
        this.shelfDetail = detail;
        this.shelfStatusForDraw=status
      },
      err => {
        alert(err)
      }
    )
  }

  onShelfClick(event){
    let key = event.target.id;
    console.log(key)
    this.shelf=this.shelfDetail[event.target.id]
    console.log(this.shelf)
    var shelfModal= document.getElementById("myModal");
    shelfModal.style.display = "flex";
  }
  onCloseModal(){
    var shelfModal= document.getElementById("myModal");
    shelfModal.style.display = "none";
  }
  search() {
    let keyword = this.searchForm.value.keyword
    this.shelfStatusForDraw=this.shelfStatus.filter(shelf=>{
      return shelf.shelfId.includes(keyword)
    }) 
    console.log(this.shelfStatusForDraw)
  }
}
