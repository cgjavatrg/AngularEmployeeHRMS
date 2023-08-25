import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from './app.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { ListManagerComponent } from './list-manager/list-manager.component';
import { EmployeeDeptComponent } from './employee-dept/employee-dept.component';
import { EmpInLastSomeYearsComponent } from './emp-in-last-some-years/emp-in-last-some-years.component';
import { HireDateYearGreaterThanComponent } from './hire-date-year-greater-than/hire-date-year-greater-than.component';

import { AssigndeptComponent } from './assigndept/assigndept.component';
import { AssignmanagerComponent } from './assignmanager/assignmanager.component';
import { AssigntitleComponent } from './assigntitle/assigntitle.component';
import { DeleteempComponent } from './deleteemp/deleteemp.component';
import { DesignationsComponent } from './designations/designations.component';
import { MgrAfterFromDateComponent } from './mgr-after-from-date/mgr-after-from-date.component';


const routes: Routes = [
  { path:"login",component:LoginComponent},
  { path:"signup",component:SignupComponent},
  { path:"aboutus",component:AboutusComponent},
  { path:"adminComp",component:AdminComponent,
      children:[
        { path:"empInLastSomeYears",component:EmpInLastSomeYearsComponent},
        { path:"hireDateYearGreaterThan",component:HireDateYearGreaterThanComponent},
        { path:"assigndept",component:AssigndeptComponent},
        { path:"assignmanager",component:AssignmanagerComponent},
        { path:"assigntitle",component:AssigntitleComponent},
        { path:"deleteemp",component:DeleteempComponent}
      ]
  },
  { path:"empComp",component:EmployeeComponent,
       children:[
        { path:"listManagers",component:ListManagerComponent},
        { path:"employeeDept",component:EmployeeDeptComponent},
        { path:"designations",component:DesignationsComponent},
        { path:"mgrAfterFromDate",component:MgrAfterFromDateComponent}
   
      ]
  }
 

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
