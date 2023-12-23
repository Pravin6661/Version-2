import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISchedule } from '../data-type.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddExamscheduleService {

  private apiUrl = `${environment.schedule}`; // Use the API URL from environment

  constructor(private http: HttpClient) { }

  // Fetches a list of exam schedules from the API
  getExamSchedules(): Observable<ISchedule[]> {
    return this.http.get<ISchedule[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.log('Error fetching schedules:', error);
        return [];
      })
    );
  }

  // Adds a new exam schedule to the API
  addExamSchedule(schedule: ISchedule): Observable<ISchedule> {
    return this.http.post<ISchedule>(this.apiUrl, { ...schedule, semester: schedule.semester }).pipe(
      catchError((error) => {
        console.log('Error adding schedule:', error);
        throw error;
      })
    );
  }

  // Removes an exam schedule from the API
  removeExamSchedule(scheduleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${scheduleId}`).pipe(
      catchError((error) => {
        console.log('Error removing schedule:', error);
        throw error;
      })
    );
  }

  // Updates an existing exam schedule in the API
  updateExamSchedule(schedule: ISchedule): Observable<ISchedule> {
    return this.http.put<ISchedule>(`${this.apiUrl}/${schedule.id}`, schedule).pipe(
      catchError((error) => {
        console.log('Error updating schedule:', error);
        throw error;
      })
    );
  }
}
