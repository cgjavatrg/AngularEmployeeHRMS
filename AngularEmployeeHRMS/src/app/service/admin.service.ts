import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { EmployeeDTO } from '../model/employee-dto';
import { catchError } from 'rxjs/operators';
import { DeptEmpProducerS } from '../model/dept-emp-producer-s';
import { DeptManagerS } from '../model/dept-manager-s';
import { TitleProducerS } from '../model/title-producer-s';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl:string = 'http://localhost:8082/';
  constructor(private http:HttpClient) { }

  // for employee services

  getEmployeesByLastSomeYears(noofyears:number):Observable<EmployeeDTO[]>{
    let url:string=this.baseUrl + "api/v1/adminhrmsconsumer/employees/"+noofyears;
    return this.http.get<EmployeeDTO[]>(url).
    pipe(catchError(this.handleError));
  }

  getCountOfEmployeesByLastSomeYears(noofyears:number):Observable<number> {
    let url:string=this.baseUrl + "api/v1/adminhrmsconsumer/employees/count/"+noofyears;
    return this.http.get<number>(url).
    pipe(catchError(this.handleError));
  }

  getEmployeesByHireDateYearGreaterThan(year:number):Observable<EmployeeDTO[]>{
    let url:string=this.baseUrl + "api/v1/adminhrmsconsumer/employees/year/"+year;
    return this.http.get<EmployeeDTO[]>(url).
    pipe(catchError(this.handleError));
  }

  getCountOfEmployeesByHireDateYearGreaterThan(year:number):Observable<number> {
    let url:string=this.baseUrl + "api/v1/adminhrmsconsumer/employees/year/count/"+year;
    return this.http.get<number>(url).
    pipe(catchError(this.handleError));
  }

  deleteEmployee(empno:number):Observable<any> {
    let url:string= this.baseUrl +"api/v1/adminhrmsconsumer/employee/"+empno;
    return this.http.delete(url,{responseType:'text'})
    .pipe(catchError(this.handleError));
  }


  // for employee department

  getEmpDeptByEmpno(empNo:number):Observable<DeptEmpProducerS[]> {
    let url:string= this.baseUrl +"api/v1/deptemp/empno/"+empNo;
    return this.http.get<DeptEmpProducerS[]>(url).
    pipe(catchError(this.handleError));
  }

  assignDepartment(deptemp:DeptEmpProducerS):Observable<any> {
   // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    let url:string=this.baseUrl+"api/v1/adminhrmsconsumer/assigndept";
    return this.http.post(url,deptemp,{responseType: "text"} ).
    pipe(catchError(this.handleError));
  }

// fro department manager

  getDeptManagerByDeptNo(deptNo:string):Observable<DeptManagerS []> {
    let url:string= this.baseUrl +"api/v1/deptmanager/deptNo/"+deptNo;
    return this.http.get<DeptManagerS []>(url).
    pipe(catchError(this.handleError));
  }

  assignManagerToDepartment(deptmgr:DeptManagerS):Observable<any>{
    let url:string= this.baseUrl +"api/v1/adminpayrollconsumer/assignmgr";
    return this.http.post(url,deptmgr,{responseType:'text'})
    .pipe(catchError(this.handleError));
  }

  // For titles

  getAlDistinctTitles():Observable<string[]> {
    let url:string=this.baseUrl +"api/v1/titles/distincttitles";
    return this.http.get<string[]>(url)
    .pipe(catchError(this.handleError));
  }

  getAllTitlesByEmpNo(empNo:number) :Observable<TitleProducerS[]> {
    let url:string= this.baseUrl+"api/v1/titles/"+empNo;
    return this.http.get<TitleProducerS[]>(url)
    .pipe(catchError(this.handleError));
  }

  assignTitle(titleob:TitleProducerS) :Observable<any> {
    let url:string= this.baseUrl+"api/v1/adminhrmslconsumer/assigntitle";
    return this.http.post(url,titleob,{responseType:'text'})
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
