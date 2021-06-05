import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ContactDetailsModel } from '../../contact-details/_models/contact-details.model';

const apiServer = "http://localhost:39993/api/Contact/";

@Injectable({
  providedIn: 'root'
})

export class ContactDetailsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  getContactList(): Observable<any> {
    const url = apiServer + "getContactList";
    return this.http.get(url, this.httpOptions);
  }

  getContactDetailsById(id: number): Observable<any> {
    const url = apiServer + "getContactById/" + id;
    return this.http.get(url, this.httpOptions);
  }

  saveContactDetails(contactDetails: ContactDetailsModel): Observable<any> {
    const url = apiServer + "saveContactDetails";
    return this.http.post<any>(url, JSON.stringify(contactDetails), this.httpOptions);
  }


  updateContactDetails(contactDetails: ContactDetailsModel): Observable<any> {
    const url = apiServer + "updateContactDetails";
    return this.http.put<any>(url, JSON.stringify(contactDetails), this.httpOptions);
  }

  deleteContactDetails(id: number): Observable<any> {
    const url = apiServer + "deleteContactDetails/" + id;
    return this.http.delete(url);
  }
}
