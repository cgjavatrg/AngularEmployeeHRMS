import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorizationInterceptor } from './interceptor/authorization.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { ListManagerComponent } from './list-manager/list-manager.component';
import { EmployeeDeptComponent } from './employee-dept/employee-dept.component';
import { EmpInLastSomeYearsComponent } from './emp-in-last-some-years/emp-in-last-some-years.component';
import { HireDateYearGreaterThanComponent } from './hire-date-year-greater-than/hire-date-year-greater-than.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { AssigndeptComponent } from './assigndept/assigndept.component';
import { AssignmanagerComponent } from './assignmanager/assignmanager.component';
import { AssigntitleComponent } from './assigntitle/assigntitle.component';
import { DeleteempComponent } from './deleteemp/deleteemp.component';
import { DesignationsComponent } from './designations/designations.component';
import { MgrAfterFromDateComponent } from './mgr-after-from-date/mgr-after-from-date.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AboutusComponent,
    AdminComponent,
    EmployeeComponent,
    ListManagerComponent,
    EmployeeDeptComponent,
    EmpInLastSomeYearsComponent,
    HireDateYearGreaterThanComponent,
    AssigndeptComponent,
    AssignmanagerComponent,
    AssigntitleComponent,
    DeleteempComponent,
    DesignationsComponent,
    MgrAfterFromDateComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwPaginationModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthorizationInterceptor,multi:true},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
