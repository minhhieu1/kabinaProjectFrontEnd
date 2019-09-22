import { Component, OnInit,TemplateRef } from '@angular/core';
import { UserService } from './../../services/user.service';
import { UserModel } from "../../models/user.model";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm }   from '@angular/forms';
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.scss']
})
export class AdminUserlistComponent implements OnInit {

  roles =[
    {"roleId":1,"roleName":"Admin"},
    {"roleId":2,"roleName":"User"}
  ]
  businesses =[
    {"unitId":1,"unitName":"Healthcare","leaderId":1},
    {"unitId":2,"unitName":"SAP","leaderId":2},
    {"unitId":3,"unitName":"Core Delivery","leaderId":3},
    {"unitId":4,"unitName":"Insurance","leaderId":4},
    {"unitId":5,"unitName":"Core Delivery","leaderId":5},
    {"unitId":6,"unitName":"Core Delivery","leaderId":6},
    {"unitId":7,"unitName":"Core Delivery","leaderId":7},
    {"unitId":8,"unitName":"JVDC","leaderId":8},
  ]
  public hideBtn = true;
  public receivedData:any;
  public userList: any;
  public currentUser: UserModel;
  public userModel: any;
  config: any;
  public configModal: any;
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;

  modalRef: BsModalRef;

  constructor(private _userService: UserService,
              private modalService: BsModalService,
              private dataService: DataService) { }

  ngOnInit() {
    this.getAccounts();
    
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
    };
    this.loadDataFromXlsx();
  }

  getAccounts() {
    this._userService.getUserList().subscribe(
      data => {
        this.userList = data;
      },
      err => {
        alert(err);
      });
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  modalDelete(template: TemplateRef<any>,user: any)
  {
    this.currentUser = user;
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
  confirmDelete(id:number) {
    this.modalRef.hide();
    this._userService.deleteUser(this.currentUser.userId).subscribe(
      data => {
        this.getAccounts();
      },
      err => {
        alert(err);
      });;
    this.getAccounts();
  }
  confirm(): void {
    this.modalRef.hide();
  }
  decline() {
    this.modalRef.hide();
  }
  modalAddUser(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, {class: 'modal-sm',ignoreBackdropClick: true});
  }
  modalEdit(template: TemplateRef<any>,user: any) {
    this.currentUser = user;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm',ignoreBackdropClick: true});
  }
  onSubmit(form: NgForm){
    this.modalRef.hide();
    this.userModel = form.value;
    //var testStr = JSON.stringify(this.userModel).replace(/\\n|\\/g, '');
    //console.log(testStr);
    console.log(this.userModel);
    this._userService.addUser(this.userModel).subscribe(
      data => {
        
        this.getAccounts();
      },
      err => {
        console.log(err);
        this.getAccounts();
      });;
  }
  onSubmitEdit(form: NgForm){
    this.modalRef.hide();
    this.userModel = form.value;
    console.log(this.userModel);
    this._userService.editUser(this.userModel).subscribe(
      data => {
        this.getAccounts();
      },
      err => {
        alert(err);
        this.getAccounts();
      });;
  }
  onSubmitList(user:any){
    this.userModel = user;
    this._userService.addUser(this.userModel).subscribe(
      data => {
      },
      err => {
        console.log(err);
        this.getAccounts();
      });;
  }
  loadDataFromXlsx() {
    this.dataService.myMethod$.subscribe(
      data => { 
        this.receivedData = data;
        this.hideBtn = false;
      },
      err => {
        alert(err);
      }
    );
  }
  addListUser() {
    let users:any[]= [];
    let dataName = Object.getOwnPropertyNames(JSON.parse(this.receivedData)).toString();
    users = JSON.parse(this.receivedData);
    for(let user of users[dataName])
    {
      this.onSubmitList(user);
    }
    this.getAccounts();
  }
}
