import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudentSignIn } from '../data-type.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddStudentService {
  private apiUrl = `${environment.studentLogin}`;

  constructor(private http: HttpClient) {}

  // Retrieves the login information from the server
  getLoginInformation(): Observable<IStudentSignIn[]> {
    return this.http.get<IStudentSignIn[]>(this.apiUrl);
  }

  // Adds a new student to the server
  addStudent(student: IStudentSignIn): Observable<IStudentSignIn> {
    return this.http.post<IStudentSignIn>(this.apiUrl, student);
  }

   // Updates the details of an existing student on the server
  updateStudent(student: IStudentSignIn): Observable<IStudentSignIn> {
    const url = `${this.apiUrl}/${student.id}`;
    return this.http.put<IStudentSignIn>(url, student);
  }

   // Removes a student from the server
  removeStudent(studentId: number): Observable<any> {
    const url = `${this.apiUrl}/${studentId}`;
    return this.http.delete(url);
  }
}
