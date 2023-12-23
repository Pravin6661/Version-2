import { Component, OnInit } from '@angular/core';
import { AddStudentService } from '../_services/add-student.service';
import { IStudentSignIn } from '../data-type.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  // Array to store login information
  loginInformation: IStudentSignIn[] = [];

  // Object to hold new student information for adding
  newStudent: IStudentSignIn = {
    id: 0,
    registernumber: 0,
    dateofbirth: 'dd-mm-yyyy',
  };

  // ID of the student to be removed
  studentId: number = 0;

  // Flags to control the display of add and remove student forms
  showAddStudentForm: boolean = false;
  showRemoveStudentForm: boolean = false;

  // Object to store the selected student for editing
  selectedStudent: IStudentSignIn | null = null;

  constructor(private addStudentService: AddStudentService) {}

  ngOnInit() {
    // Fetch login information when the component initializes
    this.fetchLoginInformation();
  }

  // Fetches login information from the service
  fetchLoginInformation() {
    this.addStudentService.getLoginInformation().subscribe(
      (data) => {
        this.loginInformation = data;
      },
      (error) => {
        console.error('Error fetching login information:', error);
      }
    );
  }

  // Adds a new student to the login information list
  addStudent() {
    if (this.validateStudent(this.newStudent)) {
      // Check if the registration number already exists
      const isDuplicate = this.loginInformation.some(
        (login) => login.registernumber === this.newStudent.registernumber
      );

      if (isDuplicate) {
        alert('Registration number already exists. Please enter a different number.');
        return;
      }

      this.addStudentService.addStudent(this.newStudent).subscribe(
        (response) => {
          console.log('Student added:', response);
          this.newStudent = { id: 0, registernumber: 0, dateofbirth: 'dd-mm-yyyy' };
          this.showAddStudentForm = false;
          this.fetchLoginInformation();
        },
        (error) => {
          console.error('Error adding student:', error);
        }
      );
    }
  }

  // Validates student information before adding or updating
  validateStudent(student: IStudentSignIn): boolean {
    const registerNumberPattern = /^\d{12}$/;
    const dateOfBirthPattern = /^\d{2}-\d{2}-\d{4}$/;

    if (!registerNumberPattern.test(String(student?.registernumber))) {
      alert('Invalid registration number. Please enter a 12-digit number.');
      return false;
    }

    if (!student?.dateofbirth || !dateOfBirthPattern.test(student.dateofbirth)) {
      alert('Invalid date of birth. Please enter the date in the format dd-mm-yyyy.');
      return false;
    }

    return true;
  }

  // Resets the new student fields and hides the add student form
  cancelAddStudent() {
    this.newStudent = { id: 0, registernumber: 0, dateofbirth: '' };
    this.showAddStudentForm = false;
  }

  // Sets the selected student for editing
  editStudent(login: IStudentSignIn) {
    this.selectedStudent = { ...login };
    this.showAddStudentForm = false;
  }

  // Updates the selected student's information
  updateStudent() {
    if (this.selectedStudent && this.validateStudent(this.selectedStudent)) {
      const isDuplicate = this.loginInformation.some(
        (login) => login.id !== this.selectedStudent?.id && login.registernumber === this.selectedStudent?.registernumber
      );

      if (isDuplicate) {
        alert('Registration number already exists. Please enter a different number.');
        return;
      }

      this.addStudentService.updateStudent(this.selectedStudent).subscribe(
        (response) => {
          console.log('Student updated:', response);
          this.selectedStudent = null;
          this.fetchLoginInformation();
          this.showAddStudentForm = false;
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
    }
  }

  // Resets selected student and hides the add student form
  cancelUpdate() {
    this.selectedStudent = null;
    this.showAddStudentForm = false;
  }

  // Deletes a student based on studentId
  deleteStudent(studentId: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.addStudentService.removeStudent(studentId).subscribe(
        () => {
          console.log('Student removed:', studentId);
          this.fetchLoginInformation();
        },
        (error) => {
          console.error('Error removing student:', error);
        }
      );
    }
  }

  // Removes a student based on studentId
  removeStudent() {
    if (this.studentId) {
      this.addStudentService.removeStudent(this.studentId).subscribe(
        () => {
          console.log('Student removed:', this.studentId);
          this.studentId = 0;
          this.showRemoveStudentForm = false;
          this.fetchLoginInformation();
        },
        (error) => {
          console.error('Error removing student:', error);
        }
      );
    }
  }

  // Resets student ID and hides the remove student form
  cancelRemoveStudent() {
    this.studentId = 0;
    this.showRemoveStudentForm = false;
  }
}
