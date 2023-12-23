import { Component, OnInit } from '@angular/core';
import { ResultService } from '../_services/result.service';
import { IResult } from '../data-type.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  studentResults: IResult[] = [];
  semesters: string[] = ['01', '02', '03', '04', '05', '06', '07', '08'];
  selectedSemester: string = '01';
  filteredResults: IResult[] = [];

  constructor(private resultService: ResultService) { }

  ngOnInit() {
    // Retrieves the login data from session storage
    const loginData = sessionStorage.getItem('login');
    if (loginData) {
       // Parses the login data into an object
      const parsedLoginData = JSON.parse(loginData);
      const registerNumber = parsedLoginData?.registernumber;
      if (registerNumber) {
        // Fetches the results using the register number
        this.fetchResults(registerNumber);
      }
    }
  }

  fetchResults(registerNumber: string) {
    // Calls the fetchResults method from the ResultService
    this.resultService.fetchResults(registerNumber).subscribe((results) => {
      this.studentResults = results;
      // Filters the results based on the selected semester
      this.filterResults();
    });
  }

  filterResults() {
     // Filters the studentResults array based on the selected semester
    this.filteredResults = this.studentResults.filter((item) => item.semester === this.selectedSemester);
  }
}
