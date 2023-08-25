import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { JwtRequestDTO } from '../model/jwt-request-dto';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { JwtResponseDTO } from '../model/jwt-response-dto';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl:string = 'http://localhost:8082/';

  private activeUser: string=null;

  constructor(private http:HttpClient,private jwthelper:JwtHelperService) {

   }

  getIsLoggedIn():boolean {
    let user = sessionStorage.getItem("username");
    console.log("User logged in "+(!(user === null)));

  
    return !(user === null );
   
  }

  getIsExpired():boolean {
    let sessiontoken:any=sessionStorage.getItem("token");
    console.log(this.jwthelper.decodeToken(sessiontoken));
    let expiry:boolean= this.jwthelper.isTokenExpired(sessiontoken);
  
    console.log ("Token Expired => "+expiry);
    return expiry;
  }

  tokenInfo() {
    let sessiontoken:any=sessionStorage.getItem("token");
    let tokenPayload:any ;
    if(sessiontoken !== null) {
       tokenPayload= decode(sessiontoken);
    }
     console.log("Token is "+JSON.stringify(tokenPayload));

 
 
  }

  logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
  }

  loginfun(jwtRequest:JwtRequestDTO ):Observable<JwtResponseDTO> {

    let url:string='';
    
    if(jwtRequest.role==='ADMIN') {
      url= `${this.baseUrl}api/v1/adminhrmsconsumer/user/login`;
    }
    else if(jwtRequest.role==='EMPLOYEE') {
      url= `${this.baseUrl}api/v1/employeehrmsconsumer/user/login`;
    }
    


     return this.http.post<JwtResponseDTO>(url,jwtRequest  ).
     pipe( map(userData => {
      //sessionStorage.setItem("username", userData.username);
      let tokenStr = "Bearer " + userData.token;
      sessionStorage.setItem("token", tokenStr);
      this.tokenInfo();
      let sessiontoken:any=sessionStorage.getItem("token");
      let tokenPayload:any ;
      if(sessiontoken !== null) {
         tokenPayload= decode(sessiontoken);
      }
      let username=tokenPayload.sub;
      console.log (username);
      sessionStorage.setItem("username", username);
      let roledata:string=tokenPayload.roles;
      let role:string=roledata.substring(1,roledata.length -1);
      console.log(role);
      sessionStorage.setItem("role",role);
      return userData;
    }),
    catchError(this.handleError));
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
