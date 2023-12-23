import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISchedule } from '../data-type.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = `${environment.schedule}`;

  constructor(private http: HttpClient) {}

  // Fetches the schedule based on the provided branch
  fetchSchedule(branch: string): Observable<ISchedule[]> {
    const url = `${this.apiUrl}?branch=${branch}`;
    return this.http.get<ISchedule[]>(url).pipe(
      map((response: any) => {
        // Maps the response data to the Schedule model
        return response.map((item: any) => {
          return {
            semester: Number(item.semester),
            subjectcode: item.subjectcode,
            subjectname: item.subjectname,
            examdate: item.examdate,
            session: item.session
          };
        });
      })
    );
  }
}
