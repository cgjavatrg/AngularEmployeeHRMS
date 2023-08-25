import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DepartmentProducerS } from '../model/department-producer-s';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl:string = 'http://localhost:8082/';

  constructor(private http:HttpClient) { }

  getAllDepartments() :Observable<DepartmentProducerS[]> {
    let url:string=this.baseUrl + "api/v1/departments";
    return this.http.get<DepartmentProducerS[]>(url).
    pipe(catchError(this.handleError));
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
