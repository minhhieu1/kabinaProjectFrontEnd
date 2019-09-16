
import {throwError as observableThrowError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';
import { HttpEvent } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { User } from 'src/app/models/user';

@Injectable()
export class RestService {
    private headers: HttpHeaders;
    private options: RequestOptions;
    private currentUser: User;

    constructor(private http: HttpClient, private AuthenticationService: AuthenticationService) {
        this.currentUser = this.AuthenticationService.currentUserValue;
        this.headers = this.getHeaders();
    }
    getHeaders() {
        return new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', "Bearer "+this.currentUser.jwttoken)
            ;
    }

    optionsByUrl(url: string) {
        return this.http.request(new HttpRequest('OPTIONS', url, { headers: this.getHeaders(), reportProgress: false })).pipe(
            map((event: HttpEvent<any>) => {
                if (event.type === HttpEventType.Response) {
                    return event.body;
                }
            }),
            catchError(this.handleError),);
    }

    getByUrl(url: string, headers?: HttpHeaders) {
        return this.http.get(url, { headers: headers || this.getHeaders() }).pipe(catchError(this.handleError));
    }

    getByUrlWithoutOptions(url: string) {
        return this.http.get(url).pipe(catchError(this.handleError));
    }

    getByUrlWithoutParsingToJson(url: string) {
        let getHeaders = new HttpHeaders({
            'X-CSC-User-Id': localStorage.getItem('userId')
        });

        return this.http.get(url, { headers: getHeaders, responseType: 'blob' }).pipe(catchError(this.handleError));
    }

    patchByUrl(url: string, obj: Object, removeEmpty = false) {
        let body = JSON.stringify(this.removeRootElement({ obj }, removeEmpty));
        return this.http.patch(url, body, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
    }

    putByUrl(url: string, obj: Object, headers?: HttpHeaders, removeEmpty = false) {
        let body = JSON.stringify(this.removeRootElement({ obj }, removeEmpty));
        return this.http.put(url, body, { headers: headers || this.getHeaders() }).pipe(catchError(this.handleError));
    }

    postByUrl(url: string, obj: Object, headers?: HttpHeaders, removeEmpty = false) {
        let body = JSON.stringify(this.removeRootElement({ obj }, removeEmpty));
        return this.http.post(url, body, { headers: headers || this.getHeaders() }).pipe(catchError(this.handleError));
    }

    postByUrlWithoutOptions(url: string, obj: Object, removeEmpty = false) {
        let body = JSON.stringify(this.removeRootElement({ obj }, removeEmpty));
        return this.http.post(url, body).pipe(catchError(this.handleError));
    }

    postByUrlWithoutParsingToJson(url: string, obj: Object, removeEmpty = false) {
        let body = JSON.stringify(this.removeRootElement({ obj }, removeEmpty));
        return this.http.post(url, body, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
    }

    deleteByUrl(url: string, headers?: HttpHeaders, removeEmpty = false) {
        return this.http.delete(url, { headers: headers || this.getHeaders() }).pipe(catchError(this.handleError));;
        // return this.http.get(url, { headers: headers || this.getHeaders() }).pipe(catchError(this.handleError));;
    }

    private handleError(error: Response | any) {
        return observableThrowError(error);
    }

    removeRootElement(obj, removeEmpty: boolean) {
        var numKeys = 0,
            rootKey;

        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) continue;
            rootKey = key;
            numKeys++;
            if (numKeys === 2) { break; }
        }

        if (numKeys === 1) {
            var newObj = {},
                rootObj = obj[rootKey];

            if (typeof rootObj === "object") {
                for (var key in rootObj) {
                    if (rootObj.hasOwnProperty(key)) {
                        if (removeEmpty && rootObj[key] !== undefined && rootObj[key] !== "") {
                            if (typeof rootObj[key] === "object") {
                                newObj[key] = this.removeRootElement(rootObj[key], false);
                            } else {
                                newObj[key] = rootObj[key];
                            }

                        } else if (!removeEmpty) {
                            newObj[key] = rootObj[key];
                        }
                    }
                }
                return newObj;
            }
        }
        return obj;
    }
}
