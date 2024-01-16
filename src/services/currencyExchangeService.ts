// Import necessary modules from Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// Create a class for your service
export class CurrencyExchangeService {
  // Inject the HttpClient in the constructor
  constructor(private http: HttpClient) {}

  // Define a method to make a GET request
  getData(): Observable<any> {
    const apiUrl = 'https://api.vatcomply.com/currencies';
    
    return this.http.get(apiUrl);
  }

  getConversion(firstCurrency:string, secondCurrency:string): Observable<any> {
    const apiUrl =
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${firstCurrency}/${secondCurrency}.json`;
    return this.http.get(apiUrl);
  }
}
