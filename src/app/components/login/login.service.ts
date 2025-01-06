import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://your-api-url.com/login'; // Replace with your API endpoint for login

  constructor(private _httpService: HttpClient) {}

  login(userName: string, password: string): Observable<any> {
    // Set up the HTTP headers if necessary
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Set up the payload
    const body = {
      username: userName,
      password: password
    };

    // Send the POST request to the login API
    return this._httpService.post(this.apiUrl, body, { headers })
      .pipe(
        catchError(this.handleError) // Handle errors in a dedicated method
      );
  }

  // Handle errors in the API call
  private handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return observableThrowError(errorMessage);
  }
}
