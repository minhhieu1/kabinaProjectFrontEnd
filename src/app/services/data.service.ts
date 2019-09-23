import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
    private myMethodSubject = new Subject<any>();
    myMethod$: Observable<any>;
    constructor() {
        this.myMethod$ = this.myMethodSubject.asObservable();
    }
    sendData(data) {
        this.myMethodSubject.next(data);
    }
}
