import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserGuard } from './auth-user.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { AssesmentComponent } from './assesment/assesment.component';
import { ResultsComponent } from './results/results.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LogoutComponent } from './logout/logout.component';
import { Admin_loginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthAdminGuard } from './auth-admin.guard';
import { AdminLogoutComponent } from './admin-logout/admin-logout.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { AddExamscheduleComponent } from './add-examschedule/add-examschedule.component';
import { AddAssesmentComponent } from './add-assesment/add-assesment.component';
import { AddExamresultsComponent } from './add-examresults/add-examresults.component';

const routes: Routes = [
  { path:'home', component:HomeComponent },
  { path:'login', component:LoginComponent },
  { path:'admin-login', component:Admin_loginComponent },
  { path:'dashboard', component:DashboardComponent, canActivate: [AuthUserGuard] },
  { path:'admin-dashboard', component:AdminDashboardComponent, canActivate: [AuthAdminGuard] },
  { path:'footer', component:FooterComponent },
  { path:'profile', component:ProfileComponent, canActivate: [AuthUserGuard] },
  { path:'assesment', component:AssesmentComponent, canActivate: [AuthUserGuard] },
  { path:'results', component:ResultsComponent, canActivate: [AuthUserGuard] },
  { path:'schedule', component:ScheduleComponent, canActivate: [AuthUserGuard] },
  { path:'logout', component:LogoutComponent },
  { path:'admin-logout', component:AdminLogoutComponent },
  { path:'add-profile', component:AddProfileComponent, canActivate: [AuthAdminGuard] },
  { path:'add-examschedule', component:AddExamscheduleComponent, canActivate: [AuthAdminGuard] },
  { path:'add-assesment', component:AddAssesmentComponent, canActivate: [AuthAdminGuard] },
  { path:'add-examresults', component:AddExamresultsComponent, canActivate: [AuthAdminGuard] },
  { path:"**", component:HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
   ]
})
export class AppRoutingModule { }
