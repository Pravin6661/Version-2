import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssesment } from '../data-type.model';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddAssesmentService {

  private apiUrl = `${environment.assesment}`; // Use the API URL from environment

  constructor(private http: HttpClient) { }

  // Fetches a list of assessments from the API
  getAssessments(): Observable<IAssesment[]> {
    return this.http.get<IAssesment[]>(this.apiUrl);
  }

  // Adds a new assessment to the API
  addAssessment(assessment: IAssesment): Observable<IAssesment> {
    return this.http.post<IAssesment>(this.apiUrl, { ...assessment }).pipe(
      catchError((error) => {
        console.log('Error adding assessment:', error);
        throw error;
      })
    );
  }

  // Updates an existing assessment in the API
  updateAssessment(assessment: IAssesment): Observable<IAssesment> {
    return this.http.put<IAssesment>(`${this.apiUrl}/${assessment.id}`, assessment).pipe(
      catchError((error) => {
        console.log('Error updating assessment:', error);
        throw error;
      })
    );
  }

  // Removes an assessment from the API
  removeAssessment(assessmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${assessmentId}`).pipe(
      catchError((error) => {
        console.log('Error removing assessment:', error);
        throw error;
      })
    );
  }
}
