import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../_services/profile.service';
import { ScheduleService } from '../_services/schedule.service';
import { IStudentProfile, ISchedule } from '../data-type.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  studentProfile: IStudentProfile | undefined;
  schedule: ISchedule[] = [];
  semesters: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  selectedSemester: number = 1;
  filteredSchedule: ISchedule[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    // Retrieves the login data from session storage
    const loginData = sessionStorage.getItem('login');
    if (loginData) {
       // Parses the login data into an object
      const parsedLoginData = JSON.parse(loginData);
      const registerNumber = parsedLoginData?.registernumber;
      if (registerNumber) {
        // Fetches the student profile using the register number
        this.fetchStudentProfile(registerNumber);
      }
    }
  }

  fetchStudentProfile(registerNumber: string) {
    // Converts the register number to a number
    const numberRegisterNumber = Number(registerNumber);
    this.profileService.fetchStudentProfile(numberRegisterNumber).subscribe((profiles) => {
      // Finds the student profile that matches the register number
      const studentProfile = profiles.find((profile: IStudentProfile) => {
        return profile.registernumber === numberRegisterNumber;
      });
      if (studentProfile) {
        // Sets the student profile
        this.studentProfile = studentProfile;
        // Fetches the schedule based on the student's branch
        this.fetchSchedule(studentProfile.branch);
      }
    });
  }

  fetchSchedule(branch: string) {
     // Fetches the schedule based on the branch
    this.scheduleService.fetchSchedule(branch).subscribe((schedule) => {
      // Sets the schedule
      this.schedule = schedule;
      // Filters the schedule based on the selected semester
      this.filterSchedule();
    });
  }

  filterSchedule() {
    console.log('Selected Semester:', this.selectedSemester);
    console.log('Schedule:', this.schedule);
    // Filters the schedule based on the selected semester
    this.filteredSchedule = this.schedule.filter((item) => item.semester.toString() === this.selectedSemester.toString());
    console.log('Filtered Schedule:', this.filteredSchedule);
  }
}

