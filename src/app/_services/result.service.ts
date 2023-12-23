import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResult } from '../data-type.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private apiUrl = `${environment.results}`;

  constructor(private http: HttpClient) {}

  // Fetches results based on register number
  fetchResults(registerNumber: string): Observable<IResult[]> {
    const url = `${this.apiUrl}?registernumber=${registerNumber}`;
    return this.http.get<IResult[]>(url);
  }
}
