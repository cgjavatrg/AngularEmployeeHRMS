import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ManagerDetailsDTO } from '../model/manager-details-dto';
import { catchError } from 'rxjs/operators';
import { EmployeeDeptDTO } from '../model/employee-dept-dto';
import { EmployeeDTO } from '../model/employee-dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl:string = 'http://localhost:8082/';

  constructor(private http:HttpClient) { 

  }
  getAllManagers():Observable<ManagerDetailsDTO[]> {
    let url:string=`${this.baseUrl}api/v1/employeehrmsconsumer/manager`;
    return this.http.get<ManagerDetailsDTO[]>(url).
    pipe(catchError(this.handleError));
  }

  getEmployeeByDeptAndFromDate(deptNo:string,fromDate:string):Observable<EmployeeDeptDTO[]>{
    let url:string=this.baseUrl +"api/v1/employeehrmsconsumer/employees/department/"+deptNo+"/fromdate/"+fromDate;
    return this.http.get<EmployeeDeptDTO[]>(url).
    pipe(catchError(this.handleError));
  }

  getAllManagersAfterFromDate(fromDate:string) :Observable<EmployeeDTO[]>{
    let url:string= this.baseUrl +"api/v1/employeehrmsconsumer/manager/"+fromDate;
    return this.http.get<EmployeeDTO[]>(url).
    pipe(catchError(this.handleError));
  }

  // for titles
  getAlDistinctTitles():Observable<string[]> {
    let url:string=this.baseUrl +"api/v1/employeehrmsconsumer/designations";
    return this.http.get<string[]>(url)
    .pipe(catchError(this.handleError));
  }
  

  private handleError(error: HttpErrorResponse){
    let errorMsg:string='';
    if(error.error instanceof ErrorEvent){
        console.error('Client Side Error: ' , error.error.message);
        errorMsg=error.error.message;
       
    }else{
      console.error('Server Side Error: ', error);
      errorMsg=error.error;
      console.log(errorMsg);
     
    }

      
    return throwError("Error Message =>"+errorMsg);
  }
}
