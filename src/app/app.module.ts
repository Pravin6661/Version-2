import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { AssesmentComponent } from './assesment/assesment.component';
import { ResultsComponent } from './results/results.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LogoutComponent } from './logout/logout.component';
import { Admin_loginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLogoutComponent } from './admin-logout/admin-logout.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { AddAssesmentComponent } from './add-assesment/add-assesment.component';
import { AddExamresultsComponent } from './add-examresults/add-examresults.component';
import { AddExamscheduleComponent } from './add-examschedule/add-examschedule.component';

import { UserService } from './_services/user.service';
import { ProfileService } from './_services/profile.service';
import { ResultService } from './_services/result.service';
import { AdminService } from './_services/admin.service';
import { AssesmentService } from './_services/assesment.service';
import { ScheduleService } from './_services/schedule.service';
import { AddStudentService } from './_services/add-student.service';
import { AddProfileService } from './_services/add-profile.service';
import { AddExamscheduleService } from './_services/add-examschedule.service';
import { LoggerService } from './_services/logger.service';
import { AddExamresultService } from './_services/add-examresult.service';









@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      Admin_loginComponent,
      AdminDashboardComponent,
      DashboardComponent,
      HomeComponent,
      FooterComponent,
      ProfileComponent,
      AssesmentComponent,
      ResultsComponent,
      ScheduleComponent,
      LogoutComponent,
      AdminLogoutComponent,
      AddProfileComponent,
      AddAssesmentComponent,
      AddExamresultsComponent,
      AddExamscheduleComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    ProfileService,
    ResultService,
    AdminService,
    AssesmentService,
    ProfileService,
    ScheduleService,
    AddStudentService,
    AddProfileService,
    AddExamscheduleService,
    AddExamresultService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
