import { Component, OnInit } from '@angular/core';
import { AddProfileService } from '../_services/add-profile.service';
import { IStudentProfile } from '../data-type.model';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {
  // Array to store student profiles
  studentProfiles: IStudentProfile[]=[];
  // Profile ID to be removed
  profileIdToRemove: number | null = null;
  // Flags to control form visibility
  showAddProfileForm = false;
  showEditProfileForm = false;
  showRemoveProfileForm = false;
  // Object to store new profile information for adding
  newProfile: IStudentProfile = { id: 0, registernumber: 0, name: '', institution: '', branch: '' };
  // Object to store selected profile for editing
  selectedProfile: IStudentProfile = { id: 0, registernumber: 0, name: '', institution: '', branch: '' };

  constructor(private addProfileService: AddProfileService) { }

  ngOnInit() {
     // Fetch student profiles when the component initializes
    this.getStudentProfiles();
  }

  getStudentProfiles() {
     // Fetch student profiles from the service
    this.addProfileService.getStudents().subscribe(
      (response) => {
        this.studentProfiles = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  // Function to add a new profile
  addProfile() {
    if (this.validateProfile(this.newProfile)) {
      // Check if the registration number already exists
      const isDuplicate = this.studentProfiles.some(
        (profile) => profile.registernumber === this.newProfile.registernumber
      );

      if (isDuplicate) {
        alert('Registration number already exists. Please enter a different number.');
        return;
      }

      // Call service to add profile
      this.addProfileService.addStudent(this.newProfile).subscribe(
        (response: IStudentProfile) => {
          this.studentProfiles.push(response);
          this.newProfile = { id: 0, registernumber: 0, name: '', institution: '', branch: '' };
          this.showAddProfileForm = false;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }


  // Validation function for profile fields
  validateProfile(profile: IStudentProfile): boolean {
    const registerNumberPattern = /^\d{12}$/;
    const nameMaxLength = 25;
    const branchInstitutionMaxLength = 45;

    if (!registerNumberPattern.test(String(profile.registernumber))) {
      alert('Invalid registration number. Please enter a 12-digit number.');
      return false;
    }

    if (profile.name.length > nameMaxLength) {
      alert(`Name exceeds the maximum limit of ${nameMaxLength} characters.`);
      return false;
    }

    if (profile.institution.length > branchInstitutionMaxLength) {
      alert(`Institution name exceeds the maximum limit of ${branchInstitutionMaxLength} characters.`);
      return false;
    }

    if (profile.branch.length > branchInstitutionMaxLength) {
      alert(`Branch name exceeds the maximum limit of ${branchInstitutionMaxLength} characters.`);
      return false;
    }

    return true;
  }


  // Function to cancel adding a profile
  cancelAddProfile() {
    this.newProfile = { id: 0, registernumber: 0, name: '', institution: '', branch: '' };
    this.showAddProfileForm = false;
  }

  // Function to remove a profile...
  removeProfile() {
    if (this.profileIdToRemove !== null) {
      this.addProfileService.removeStudent(this.profileIdToRemove).subscribe(
        () => {
          this.studentProfiles = this.studentProfiles.filter((profile) => profile.id !== this.profileIdToRemove);
          this.profileIdToRemove = null;
          this.showRemoveProfileForm = false;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  // Function to cancel removing a profile...
  cancelRemoveProfile() {
    this.profileIdToRemove = null;
    this.showRemoveProfileForm = false;
  }

  // Function to edit a profile...
  editProfile(profile: IStudentProfile) {
    this.selectedProfile = { ...profile };
    this.showEditProfileForm = true;
  }


  // Function to update a profile...
  updateProfile() {
    if (this.validateProfile(this.selectedProfile)) {
      // Check if the new registration number already exists
      const isDuplicate = this.studentProfiles.some(
        (profile) => profile.id !== this.selectedProfile.id && profile.registernumber === this.selectedProfile.registernumber
      );

      if (isDuplicate) {
        alert('Registration number already exists. Please enter a different number.');
        return;
      }

      const index = this.studentProfiles.findIndex((profile) => profile.id === this.selectedProfile.id);
      if (index !== -1) {
        this.addProfileService.updateStudent(this.selectedProfile).subscribe(
          () => {
            this.studentProfiles[index] = { ...this.selectedProfile };
            this.showEditProfileForm = false;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  // Function to cancel editing a profile...
  cancelEditProfile() {
    this.showEditProfileForm = false;
  }

  // Function to confirm and delete a profile...
  confirmDeleteProfile(profile: IStudentProfile) {
    const isConfirmed = confirm(`Are you sure you want to delete the profile`);
    if (isConfirmed) {
      this.deleteProfile(profile);
    }
  }

  // Function to delete a profile...
  deleteProfile(profile: IStudentProfile) {
    this.addProfileService.removeStudent(profile.id).subscribe(
      () => {
        this.studentProfiles = this.studentProfiles.filter((p) => p.id !== profile.id);
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
