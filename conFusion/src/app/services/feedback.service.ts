import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Feedback } from '../shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(baseURL + 'feedback')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  postFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log("feedback="+ feedback);
    return this.http.post<Feedback>(baseURL + 'feedback', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}