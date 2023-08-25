import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularEmployeeHRMS';
  isLogin:boolean=false;
  constructor(private userService:UserService,private router:Router) {
    
  }
  ngOnInit(): void {
   this.isLogin=this.userService.getIsLoggedIn();
  }

  logout():void{
    this.userService.logout();
    this.isLogin=this.userService.getIsLoggedIn();
    console.log("Logged In "+ this.isLogin);
    this.router.navigate(["login"]);
  }
  
}
