import { Component, OnInit } from '@angular/core';
import { IAssesment } from '../data-type.model';
import { AddAssesmentService } from '../_services/add-assesment.service';


@Component({
  selector: 'app-add-assesment',
  templateUrl: './add-assesment.component.html',
  styleUrls: ['./add-assesment.component.css']
})
export class AddAssesmentComponent implements OnInit {

  assessments: IAssesment[] = [];
  semesters: string[] = [];
  registerNumbers: number[] = [];
  selectedSemester: string = '01';
  selectedRegisterNumber: number | null = null;
  filteredAssessments: IAssesment[] = [];
  showAddAssessmentForm = false;
  showEditAssessmentForm = false;
  showRemoveAssessmentForm = false;
  newAssessment: IAssesment = {id: 0,registernumber:0,semester: '',branch: '',subjectcode: '',subjectname: '',assigned: '',completed: ''};
  editingAssessment: IAssesment = {id: 0,registernumber:0,semester: '',branch: '',subjectcode: '',subjectname: '',assigned: '',completed: ''};
  assessmentIdToRemove: number | null = null;

  constructor(private addAssesmentService: AddAssesmentService) {}

  ngOnInit() {
    this.getAssessments();
  }

  getAssessments() {
    this.addAssesmentService.getAssessments().subscribe(
      (response: IAssesment[]) => {
        this.assessments = response;
        this.semesters = Array.from({ length: 8 }, (_, index) => `${(index + 1).toString().padStart(2, '0')}`);
        this.registerNumbers = [...new Set(response.map(assessment => assessment.registernumber))];
        this.applyFilters();
      },
      (error) => {
        console.log('Error fetching assessments:', error);
      }
    );
  }

  onSemesterChange() {
    this.applyFilters();
  }

  onRegisterNumberChange() {
    this.applyFilters();
  }

  applyFilters() {
    const registerNumber: number | null = this.selectedRegisterNumber !== null? Number(this.selectedRegisterNumber): null;

    if (this.selectedSemester && registerNumber !== null) {
      this.filteredAssessments = this.assessments.filter(
        assessment =>
          assessment.semester === this.selectedSemester &&
          assessment.registernumber === registerNumber
      );
    } else if (this.selectedSemester) {
      this.filteredAssessments = this.assessments.filter(
        assessment => assessment.semester === this.selectedSemester
      );
    } else if (registerNumber !== null) {
      this.filteredAssessments = this.assessments.filter(
        assessment => assessment.registernumber === registerNumber
      );
    } else {
      this.filteredAssessments = this.assessments;
    }
  }

  addAssessment() {

    if (this.validateAssessment(this.newAssessment)) {
      this.addAssesmentService.addAssessment(this.newAssessment).subscribe(
        (response) => {
          this.filteredAssessments.push(response);
          this.newAssessment = { id: 0, registernumber: 0, semester: '', branch: '', subjectcode: '', subjectname: '', assigned: '', completed: '' };
          this.showAddAssessmentForm = false;
        },
        (error) => {
          console.log('Error adding assessment:', error);
        }
      );
    }
  }


  validateAssessment(assessment: IAssesment): boolean {
    const registerNumberMinLength = 12;
    const branchMaxLength = 45;
    const semesterPattern = /^(0[1-8])$/;
    const subjectCodeMinLength = 6;
    const subjectNameMaxLength = 50;
    const assignedPattern = /^(Assigned|Not Assigned)$/i;
    const completedPattern = /^(Completed|Not Completed)$/i;

    if (assessment.registernumber.toString().length < registerNumberMinLength) {
      alert(`Register number must be at least ${registerNumberMinLength} characters long.`);
      return false;
    }

    if (assessment.branch.length > branchMaxLength) {
      alert(`Branch name exceeds the maximum limit of ${branchMaxLength} characters.`);
      return false;
    }

    if (!semesterPattern.test(assessment.semester)) {
      alert('Invalid semester. Please enter a value between 01 and 08.');
      return false;
    }

    if (assessment.subjectcode.length < subjectCodeMinLength) {
      alert(`Subject code must be at least ${subjectCodeMinLength} characters long.`);
      return false;
    }

    if (assessment.subjectname.length > subjectNameMaxLength) {
      alert(`Subject name exceeds the maximum limit of ${subjectNameMaxLength} characters.`);
      return false;
    }

    if (!assignedPattern.test(assessment.assigned)) {
      alert('Invalid value for "Assigned". It should be either "Assigned" or "Not Assigned".');
      return false;
    }

    if (!completedPattern.test(assessment.completed)) {
      alert('Invalid value for "Completed". It should be either "Completed" or "Not Completed".');
      return false;
    }

    return true;
  }


  editAssessment(assessment: IAssesment) {
    this.showEditAssessmentForm = true;
    this.editingAssessment = { ...assessment };
  }

  updateAssessment() {
    if (this.validateAssessment(this.editingAssessment)) {
      if (!this.editingAssessment) {
        console.log('No assessment is being edited.');
        return;
      }

      this.addAssesmentService.updateAssessment(this.editingAssessment).subscribe(
        (updatedAssessment) => {
          const index = this.filteredAssessments.findIndex(assessment => assessment.id === updatedAssessment.id);
          if (index !== -1) {
            this.filteredAssessments[index] = updatedAssessment;
          }
          this.cancelEditAssessment();
        },
        (error) => {
          console.log('Error updating assessment:', error);
        }
      );
    }
  }


  removeAssessment() {
    if (this.assessmentIdToRemove) {
      this.addAssesmentService.removeAssessment(this.assessmentIdToRemove).subscribe(
        () => {
          this.filteredAssessments = this.filteredAssessments.filter(
            assessment => assessment.id !== this.assessmentIdToRemove
          );
          this.assessmentIdToRemove = null;
          this.showRemoveAssessmentForm = false;
          this.getAssessments();
        },
        error => {
          console.log('Error removing assessment:', error);
        }
      );
    }
  }

  deleteAssessment(assesmentId: number) {
    const confirmDelete = confirm("Are you sure you want to delete this assesment?");
    if (confirmDelete) {
      this.addAssesmentService.removeAssessment(assesmentId).subscribe(
        () => {
          this.filteredAssessments = this.filteredAssessments.filter(assesment => assesment.id !== assesmentId);
        },
        (error) => {
          console.log('Error removing schedule:', error);
        }
      );
    }
  }

  cancelAddAssessment() {
    this.newAssessment = { id: 0,registernumber:0,semester: '',branch: '',subjectcode: '',subjectname: '',assigned: '',completed: '' };
    this.showAddAssessmentForm = false;
  }

  cancelEditAssessment() {
    this.editingAssessment = {id: 0,registernumber:0,semester: '',branch: '',subjectcode: '',subjectname: '',assigned: '',completed: ''};
    this.showEditAssessmentForm = false;
  }

  cancelRemoveAssessment() {
    this.assessmentIdToRemove = null;
    this.showRemoveAssessmentForm = false;
  }


}
