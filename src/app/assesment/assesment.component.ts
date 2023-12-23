import { Component, OnInit } from '@angular/core';
import { IAssesment } from '../data-type.model';
import { AssesmentService } from '../_services/assesment.service';

@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.css']
})
export class AssesmentComponent implements OnInit {

  assignmentStatus: IAssesment[]=[];
  semesters: string[] = ['01', '02', '03', '04', '05', '06', '07', '08'];
  selectedSemester: string = '01';
  filteredAssesmentStatus: IAssesment[] = [];

  constructor(private assesmentService: AssesmentService) { }

  ngOnInit() {
    // Retrieves the login data from sessionStorage
    const loginData = sessionStorage.getItem('login');
    if (loginData) {
      // Parses the login data
      const parsedLoginData = JSON.parse(loginData);
      const registerNumber = parsedLoginData?.registernumber;
      if (registerNumber) {
         // Fetches the assessment status based on the register number
        this.fetchAssesmentStatus(registerNumber);
      }
    }
  }

  // Fetches the assessment status based on the register number
  fetchAssesmentStatus(registerNumber: string) {
    this.assesmentService.fetchAssesmentStatus(registerNumber).subscribe((assesment) => {
      this.assignmentStatus = assesment;
      // Filters the assessment status based on the selected semester
      this.filterAssesmentStatus();
    });
  }

  // Filters the assessment status based on the selected semester
  filterAssesmentStatus() {
    this.filteredAssesmentStatus = this.assignmentStatus.filter((item) => item.semester === this.selectedSemester);
  }


}
