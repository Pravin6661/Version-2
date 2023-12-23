import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResult } from '../data-type.model';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddExamresultService {

  private apiUrl = `${environment.results}`; // Use the API URL from environment

  constructor(private http: HttpClient) { }

  // Fetches a list of exam results from the API
  getExamResults(): Observable<IResult[]> {
    return this.http.get<IResult[]>(this.apiUrl);
  }

  // Adds a new exam result to the API
  addExamResult(result: IResult): Observable<IResult> {
    return this.http.post<IResult>(this.apiUrl, { ...result }).pipe(
      catchError((error) => {
        console.log('Error adding result:', error);
        throw error;
      })
    );
  }

  // Updates an existing exam result in the API
  updateExamResult(result: IResult): Observable<IResult> {
    return this.http.put<IResult>(`${this.apiUrl}/${result.id}`, result).pipe(
      catchError((error) => {
        console.log('Error updating result:', error);
        throw error;
      })
    );
  }

  // Removes an exam result from the API
  removeExamResult(resultId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${resultId}`).pipe(
      catchError((error) => {
        console.log('Error removing result:', error);
        throw error;
      })
    );
  }
}
