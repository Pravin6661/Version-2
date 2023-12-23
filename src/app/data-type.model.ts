// Represents student sign-in information
export interface IStudentSignIn {
  id: number; // Unique identifier for the student
  registernumber: number; // Student's registration number
  dateofbirth: string; // Student's date of birth
}

// Represents admin sign-in information
export interface IAdminSignIn {
  email: string; // Admin's email address
  password: string; // Admin's password
}

// Represents student profile information
export interface IStudentProfile {
  id: number; // Unique identifier for the student profile
  registernumber: number; // Student's registration number
  name: string; // Student's name
  institution: string; // Institution where the student belongs
  branch: string; // Branch of study
}

// Represents exam schedule information
export interface ISchedule {
  id: number; // Unique identifier for the schedule
  branch: string; // Branch for the schedule
  semester: string; // Semester for the exam
  subjectcode: string; // Subject code for the exam
  subjectname: string; // Name of the subject
  examdate: string; // Date of the exam
  session: string; // Session of the exam
}

// Represents exam result information
export interface IResult {
  id: number; // Unique identifier for the result
  registernumber: number; // Student's registration number
  branch: string; // Branch for the result
  semester: string; // Semester for the result
  subjectcode: string; // Subject code for the result
  subjectname: string; // Name of the subject
  grade: string; // Grade obtained
  result: string; // Result status (e.g., pass/fail)
}

// Represents assessment information
export interface IAssesment {
  id: number; // Unique identifier for the assessment
  registernumber: number; // Student's registration number
  branch: string; // Branch for the assessment
  semester: string; // Semester for the assessment
  subjectcode: string; // Subject code for the assessment
  subjectname: string; // Name of the subject
  assigned: string; // Date when assessment is assigned
  completed: string; // Date when assessment is completed
}
