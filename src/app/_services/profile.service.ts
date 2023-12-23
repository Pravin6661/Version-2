import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudentProfile } from '../data-type.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  private apiUrl = `${environment.studentProfile}`;

constructor(private http: HttpClient) { }

 // Fetches student profile based on register number
fetchStudentProfile(registerNumber: number) {
  const url = `${this.apiUrl}`;
  return this.http.get<IStudentProfile[]>(url).pipe(
    map((response: any) => {
      // Convert the registernumber property to number datatype
      const profiles = response.map((profile: any) => {
        return {
          ...profile,
          registernumber: Number(profile.registernumber)
        };
      });
      return profiles;
    })
  );
}

}
