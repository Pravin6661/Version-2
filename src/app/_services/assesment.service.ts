import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssesment} from '../data-type.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssesmentService {

  private apiUrl = `${environment.assesment}`;

  constructor(private http: HttpClient) { }

  // Fetches assessment status for a given register number
  fetchAssesmentStatus(registerNumber: string): Observable<IAssesment[]> {
    const url = `${this.apiUrl}?registernumber=${registerNumber}`;
    return this.http.get<IAssesment[]>(url);
  }

}
