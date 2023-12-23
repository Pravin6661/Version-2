import { Component, OnInit } from '@angular/core';
import { ISchedule } from '../data-type.model';
import { AddExamscheduleService } from '../_services/add-examschedule.service';

@Component({
  selector: 'app-add-examschedule',
  templateUrl: './add-examschedule.component.html',
  styleUrls: ['./add-examschedule.component.css']
})
export class AddExamscheduleComponent implements OnInit {

  schedules: ISchedule[] = [];
  semesters: string[] = [];
  selectedSemester: string | null = null;
  filteredSchedules: ISchedule[] = [];


  showAddScheduleForm = false;
  showRemoveScheduleForm = false;
  showEditScheduleForm = false;
  newSchedule: ISchedule = {id: 0,semester: '',branch: '',subjectcode: '',subjectname: '',examdate: '',session: ''};
  editingSchedule: ISchedule = {id: 0,semester: '',branch: '',subjectcode: '',subjectname: '',examdate: '',session: ''};

  scheduleIdToRemove: number | null = null;

  constructor(private addExamscheduleService: AddExamscheduleService) {}

  ngOnInit() {
    this.getExamSchedules();
  }

  getExamSchedules() {
    this.addExamscheduleService.getExamSchedules().subscribe(
      (response: ISchedule[]) => {
        this.schedules = response;
        this.semesters = [...new Set(response.map(schedule => schedule.semester))];
        this.filteredSchedules = this.schedules;
        this.selectedSemester = this.semesters[0];
        this.onSemesterChange();
      },
      (error) => {
        console.log('Error fetching schedules:', error);
      }
    );
  }

  onSemesterChange() {
    if (this.selectedSemester) {
      this.filteredSchedules = this.schedules.filter(schedule => schedule.semester === this.selectedSemester);
    } else {
      this.filteredSchedules = this.schedules;
    }
  }

  addSchedule() {
    if (!this.newSchedule.semester) {
      if (this.selectedSemester) {
        this.newSchedule.semester = this.selectedSemester;
      } else {
        console.log('Please provide a semester for the new schedule.');
        return;
      }
    }

    if (!this.validateSchedule(this.newSchedule)) {
      return;
    }

    this.addExamscheduleService.addExamSchedule(this.newSchedule).subscribe(
      (response) => {
        this.filteredSchedules.push(response);
        this.newSchedule = {id: 0,semester: '',branch: '',subjectcode: '',subjectname: '',examdate: '',session: ''};
        this.showAddScheduleForm = false;
        this.getExamSchedules();
      },
      (error) => {
        console.log('Error adding schedule:', error);
      }
    );
  }

  validateSchedule(schedule: ISchedule): boolean {
    const branchMaxLength = 45;
    const semesterPattern = /^(0[1-8])$/;
    const subjectCodeMinLength = 6;
    const subjectNameMaxLength = 50;
    const examDatePattern = /^[0-9]{2}\-[A-Z]{3}\-[0-9]{2}$/;
    const sessionPattern = /^(F\.N|A\.N)$/;

    if (schedule.branch.length > branchMaxLength) {
      alert(`Branch name exceeds the maximum limit of ${branchMaxLength} characters.`);
      return false;
    }

    if (!semesterPattern.test(schedule.semester)) {
      alert('Invalid semester. Please enter a value between 01 and 08.');
      return false;
    }

    if (schedule.subjectcode.length < subjectCodeMinLength) {
      alert(`Subject code must be at least ${subjectCodeMinLength} characters long.`);
      return false;
    }

    if (schedule.subjectname.length > subjectNameMaxLength) {
      alert(`Subject name exceeds the maximum limit of ${subjectNameMaxLength} characters.`);
      return false;
    }

    if (!examDatePattern.test(schedule.examdate)) {
      alert('Invalid exam date. Please enter the date in the format dd-MMM-yy.');
      return false;
    }

    if (!sessionPattern.test(schedule.session)) {
      alert('Invalid session. Session should be either F.N or A.N.');
      return false;
    }

    return true;
  }


  removeSchedule() {
    if (this.scheduleIdToRemove) {
      this.addExamscheduleService.removeExamSchedule(this.scheduleIdToRemove).subscribe(
        () => {
          this.filteredSchedules = this.filteredSchedules.filter(schedule => schedule.id !== this.scheduleIdToRemove);
          this.scheduleIdToRemove = null;
          this.showRemoveScheduleForm = false;
          this.getExamSchedules();
        },
        (error) => {
          console.log('Error removing schedule:', error);
        }
      );
    }
  }

  editSchedule(schedule: ISchedule) {
    this.showEditScheduleForm = true;
    this.editingSchedule = { ...schedule };
  }

  deleteSchedule(scheduleId: number) {
    const confirmDelete = confirm("Are you sure you want to delete this schedule?");
    if (confirmDelete) {
      this.addExamscheduleService.removeExamSchedule(scheduleId).subscribe(
        () => {
          this.filteredSchedules = this.filteredSchedules.filter(schedule => schedule.id !== scheduleId);
        },
        (error) => {
          console.log('Error removing schedule:', error);
        }
      );
    }
  }

  updateSchedule() {

    if (!this.validateSchedule(this.editingSchedule)) {
      return;
    }
    if (this.editingSchedule) {
      this.addExamscheduleService.updateExamSchedule(this.editingSchedule).subscribe(
        (updatedSchedule) => {
          const index = this.filteredSchedules.findIndex(schedule => schedule.id === updatedSchedule.id);
          if (index !== -1) {
            this.filteredSchedules[index] = updatedSchedule;
          }
          this.cancelEditSchedule();
          this.editingSchedule = {id: 0,semester: '',branch: '',subjectcode: '',subjectname: '',examdate: '',session: ''};
          this.showEditScheduleForm = false;
        },
        (error) => {
          console.log('Error updating schedule:', error);
        }
      );
    }
  }

  cancelEditSchedule() {
    this.editingSchedule = {id: 0,semester: '',branch: '',subjectcode: '',subjectname: '',examdate: '',session: ''};
    this.showEditScheduleForm = false;
  }

  cancelAddSchedule() {
    this.newSchedule = {id: 0,semester: this.selectedSemester || '',branch: '',subjectcode: '',subjectname: '',examdate: '',session: ''};
    this.showAddScheduleForm = false;
  }

  cancelRemoveSchedule() {
    this.scheduleIdToRemove = null;
    this.showRemoveScheduleForm = false;
  }
}



