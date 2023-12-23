import { Component, OnInit } from '@angular/core';
import { IResult } from '../data-type.model';
import { AddExamresultService } from '../_services/add-examresult.service';

@Component({
  selector: 'app-add-examresults',
  templateUrl: './add-examresults.component.html',
  styleUrls: ['./add-examresults.component.css']
})
export class AddExamresultsComponent implements OnInit {

  results: IResult[] = [];
  semesters: string[] = [];
  registerNumbers: number[] = [];
  selectedSemester: string = '01';
  selectedRegisterNumber: number | null = null;
  filteredResults: IResult[] = [];
  showAddResultForm = false;
  showEditResultForm = false;
  showRemoveResultForm = false;
  newResult: IResult = { id: 0, registernumber: 0, semester: '', branch: '', subjectcode: '', subjectname: '', grade: '', result: '' };
  editingResult: IResult = { id: 0, registernumber: 0, semester: '', branch: '', subjectcode: '', subjectname: '', grade: '', result: '' };
  resultIdToRemove: number | null = null;

  constructor(private examResultService: AddExamresultService) { }

  ngOnInit() {
    this.getExamResults();
  }

  getExamResults() {
    this.examResultService.getExamResults().subscribe(
      (response: IResult[]) => {
        this.results = response;
        this.semesters = Array.from({ length: 8 }, (_, index) => `${(index + 1).toString().padStart(2, '0')}`);
        this.registerNumbers = [...new Set(response.map(result => result.registernumber))];
        this.applyFilters();
      },
      (error) => {
        console.log('Error fetching results:', error);
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
    const registerNumber: number | null = this.selectedRegisterNumber !== null ? Number(this.selectedRegisterNumber) : null;

    if (this.selectedSemester && registerNumber !== null) {
      this.filteredResults = this.results.filter(
        result =>
          result.semester === this.selectedSemester &&
          result.registernumber === registerNumber
      );
    } else if (this.selectedSemester) {
      this.filteredResults = this.results.filter(
        result => result.semester === this.selectedSemester
      );
    } else if (registerNumber !== null) {
      this.filteredResults = this.results.filter(
        result => result.registernumber === registerNumber
      );
    } else {
      this.filteredResults = this.results;
    }
  }

  addResult() {
    if(this.validateResult(this.newResult)){
    this.examResultService.addExamResult(this.newResult).subscribe(
      (response) => {
        this.filteredResults.push(response);
        this.newResult = { id: 0, registernumber: 0, semester: '', branch: '', subjectcode: '', subjectname: '', grade: '', result: '' };
        this.showAddResultForm = false;
      },
      (error) => {
        console.log('Error adding result:', error);
      }
    );
    }
  }

  validateResult(result: IResult): boolean {

    const registerNumberMinLength = 12;
    const branchMaxLength = 45;
    const semesterPattern = /^(0[1-8])$/;
    const subjectCodeMinLength = 6;
    const subjectNameMaxLength = 50;
    const gradePattern = /^(O|A\+|A|B\+|B|U)$/i;
    const resultPattern = /^(PASS|FAIL)$/i;

    if (result.registernumber.toString().length < registerNumberMinLength) {
      alert(`Register number must be at least ${registerNumberMinLength} characters long.`);
      return false;
    }

    if (result.branch.length > branchMaxLength) {
      alert(`Branch name exceeds the maximum limit of ${branchMaxLength} characters.`);
      return false;
    }

    if (!semesterPattern.test(result.semester)) {
      alert('Invalid semester. Please enter a value between 01 and 08.');
      return false;
    }

    if (result.subjectcode.length < subjectCodeMinLength) {
      alert(`Subject code must be at least ${subjectCodeMinLength} characters long.`);
      return false;
    }

    if (result.subjectname.length > subjectNameMaxLength) {
      alert(`Subject name exceeds the maximum limit of ${subjectNameMaxLength} characters.`);
      return false;
    }

    if (!gradePattern.test(result.grade)) {
      alert('Invalid grade. It should be one of "O", "A+", "A", "B+", "B", or "U".');
      return false;
    }

    if (!resultPattern.test(result.result)) {
      alert('Invalid result. It should be either "PASS" or "FAIL".');
      return false;
    }

    return true;
  }

  editResult(result: IResult) {
    this.showEditResultForm = true;
    this.editingResult = { ...result };
  }

  updateResult() {
    if (!this.editingResult) {
      console.log('No result is being edited.');
      return;
    }

    if (this.validateResult(this.editingResult)) {
      this.examResultService.updateExamResult(this.editingResult).subscribe(
        (updatedResult) => {
          const index = this.filteredResults.findIndex(result => result.id === updatedResult.id);
          if (index !== -1) {
            this.filteredResults[index] = updatedResult;
          }
          this.cancelEditResult();
        },
        (error) => {
          console.log('Error updating result:', error);
        }
      );
    }
  }

  removeResult() {
    if (this.resultIdToRemove) {
      this.examResultService.removeExamResult(this.resultIdToRemove).subscribe(
        () => {
          this.filteredResults = this.filteredResults.filter(
            result => result.id !== this.resultIdToRemove
          );
          this.resultIdToRemove = null;
          this.showRemoveResultForm = false;
        },
        error => {
          console.log('Error removing result:', error);
        }
      );
    }
  }

  deleteResult(resultId: number) {
    const confirmDelete = confirm("Are you sure you want to delete this result?");
    if (confirmDelete) {
      this.examResultService.removeExamResult(resultId).subscribe(
        () => {
          this.filteredResults = this.filteredResults.filter(result => result.id !== resultId);
        },
        (error) => {
          console.log('Error removing result:', error);
        }
      );
    }
  }

  cancelAddResult() {
    this.newResult = { id: 0, registernumber: 0, semester: '', branch: '', subjectcode: '', subjectname: '', grade: '', result: '' };
    this.showAddResultForm = false;
  }

  cancelEditResult() {
    this.editingResult = { id: 0, registernumber: 0, semester: '', branch: '', subjectcode: '', subjectname: '', grade: '', result: '' };
    this.showEditResultForm = false;
  }

  cancelRemoveResult() {
    this.resultIdToRemove = null;
    this.showRemoveResultForm = false;
  }


}
