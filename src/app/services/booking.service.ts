import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) { }

  getBookingList(id: number) {
    return this.http.get(`${environment.apiUrl}/users/${id}/historybooking`);
  }

  getStartAndEnd() {
    let today = new Date();
    let min = this.formatDateToString(today);
    let date2 = this.addDays(today, 6 - (today.getDay() + 1));
    let max = this.formatDateToString(date2);
    return ({ min, max });
  }
  addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  formatDateToString(date) {
    let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    return date.getFullYear() + '-' + MM + '-' + dd;
  }
  checkStart_EndDateInput(start, end) {
    var startDate = new Date(start);
    var endDate = new Date(end);
    var minmax = this.getStartAndEnd();
    var min = new Date(minmax['min']);
    var max = new Date(minmax['max']);
    if (startDate > endDate) {
      return true;
    }
    if (startDate < min || startDate > max) {
      return true;
    }
    if (endDate < min || endDate > max) {
      return true;
    }
    return false;
  }

  getShelfInRange(start, end, unitId) {
    let alvailable = [];
    console.log('get shelf free in user range' + start + " " + end + " " + unitId)
    const params = new HttpParams()
      .set('startDate', start)
      .set('endDate', end)
      .set('unitId', unitId);
    console.log(`${environment.api}/users/booking?` + params)
    this.http.get(`${environment.api}/users/booking?` + params).subscribe(
      data => {
        let free = data['Free'];
        let used = data['Used'];
        for (var key in used) {
          alvailable.push({ 'shelfId': used[key]['shelfId'], 'status': 1 })
        }
        for (var key in free) {
          alvailable.push({ 'shelfId': free[key]['shelfId'], 'status': 0 })
        }
      },
      err => {
        alert(err);
      }
    );
    return alvailable;
  }
  sendBookingRequest(userId, shelfId, startDate, endDate) {
    console.log(`Send booking request UserId: ${userId} shelfId: ${shelfId} startDate: ${startDate} endDate: ${endDate}`)
    let params = new HttpParams()
      .set('userId', userId)
      .set('shelfId', shelfId)
      .set('startDate', startDate)
      .set('endDate', endDate);
    this.http.post(`${environment.api}/users/requesebooking`, (params))
      .toPromise()
      .then(function (response) {// success is deprecated, use then instead
        if (response == 1) {
          alert("Yay. Success  :))))))");
          window.location.reload();
        } else {
          alert("You already book shelf in the range date. Please adjust your range. You cannot book 2 shelf in 1 day");
        }


      })
      .catch(function (error) {   // use catch instead of error
        alert("Something wrong. Please try again :(((((");
      });
  }
  findUserBookingUnapprove(userId) {
    console.log('Find booking unapprove');
    let bookingUnApprove = [];
    let params = new HttpParams()
      .set('userId', userId);
    this.http.get(`${environment.api}/users/BookingUnapprove?` + params).subscribe(
      data => {
        // check = Object.entries(data).length === 0 ? false : true;
        for (var key in data) {
          var start = new Date(data[key]['startDate']);
          var end = new Date(data[key]['endDate'])
          data[key]['startDate'] = this.formatDateToString(start);
          data[key]['endDate'] = this.formatDateToString(end);
          bookingUnApprove.push(data[key])
        }
      },
      err => {
        alert(err)
      }
    )
    return bookingUnApprove;
  }
  findUserBookingHistory(userId) {
    console.log('Find booking history');
    let bookingHistory = [];
    let params = new HttpParams()
      .set('userId', userId);
    this.http.get(`${environment.api}/users/BookingHistory?` + params).subscribe(
      data => {
        // check = Object.entries(data).length === 0 ? false : true;
        for (var key in data) {
          var start = new Date(data[key]['startDate']);
          var end = new Date(data[key]['endDate'])
          data[key]['startDate'] = this.formatDateToString(start);
          data[key]['endDate'] = this.formatDateToString(end);
          bookingHistory.push(data[key])
        }
      },
      err => {
        alert(err)
      }
    )
    return bookingHistory;
  }


  findUserBookingEdit(userId) {
    console.log('Find booking edit');
    let bookingEdit = [];
    let params = new HttpParams()
      .set('userId', userId);
    this.http.get(`${environment.api}/users/BookingEdit?` + params).subscribe(
      data => {
        for (var key in data) {
          var start = new Date(data[key]['startDate']);
          var end = new Date(data[key]['endDate'])
          data[key]['startDate'] = this.formatDateToString(start);
          data[key]['endDate'] = this.formatDateToString(end);
          bookingEdit.push(data[key])
        }
      },
      err => {
        alert(err)
      }
    )
    return bookingEdit;
  }

  getShelfAdmin(startDate, endDate) {
    console.log('Get list shelf free admin')
    let alvailable = [];
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
    this.http.get(`${environment.api}/admin/booking?` + params).subscribe(
      data => {
        console.log(data);
        let free = data['Free'];
        let used = data['Used'];
        for (var key in used) {
          alvailable.push({ 'shelfId': used[key]['shelfId'], 'status': 1 })
        }
        for (var key in free) {
          alvailable.push({ 'shelfId': free[key]['shelfId'], 'status': 0 })
        }
      },
      err => {
        alert(err);
      }
    );
    return alvailable;
  }
  sendBookingRequestAdmin(userId, shelfId, startDate, endDate) {
    console.log(`Send booking request UserId: ${userId} shelfId: ${shelfId} startDate: ${startDate} endDate: ${endDate}`)
    let check=0
    let params = new HttpParams()
      .set('userId', userId)
      .set('shelfId', shelfId)
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.post(`${environment.api}/admin/requesebooking`, (params));
      
  }
}

