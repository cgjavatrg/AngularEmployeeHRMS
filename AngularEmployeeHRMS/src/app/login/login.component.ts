import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtRequestDTO } from '../model/jwt-request-dto';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { JwtResponseDTO } from '../model/jwt-response-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg:string=null;
  isLogin:boolean=false;

  jwtRequest:JwtRequestDTO=null;
  jwtResponse:JwtResponseDTO= null;

  loginform=new FormGroup({
    username:new FormControl('',[Validators.required , Validators.pattern("\\d+") ])  ,
    password:new FormControl('' , [Validators.required , Validators.minLength(1) ] ),  
    role:new FormControl('',[Validators.required]),
     });  
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userService.logout();
  }

  

  get Username(){  
    return this.loginform.get('username');  
  }  

  
  get Passowrd(){  
    return this.loginform.get('password');  
  }  

  get ROLE(){
    return this.loginform.get('role');
  }

  login():void {
    this.jwtRequest=new JwtRequestDTO();
    this.jwtRequest.username=this.Username.value;
    this.jwtRequest.password=this.Passowrd.value;
    this.jwtRequest.role=this.ROLE.value;

    this.userService.loginfun(this.jwtRequest).subscribe(
      (data)=>{ 
        this.jwtResponse=data;
      },
      (error)=>{ 
        if(error!==null || error!=='')
        {
         this.errorMsg=error;
        }
        this.jwtResponse=null;
        this.loginform.reset();
        //this.service.setUserDTO(null);
      },
      ()=>{
        this.errorMsg=null;
       // this.service.setUserDTO(this.user);
       this.isLogin=this.userService.getIsLoggedIn();
       console.log("Login component login sttus "+this.isLogin);
 
         alert("You logged in successfully");
       
       
       let role=sessionStorage.getItem("role");
       console.log("Login component role sttus "+role);
   
         if (role==="ADMIN") {
           this.router.navigate(["adminComp"]);
         }
         if(role==="EMPLOYEE") {
           this.router.navigate(["empComp"]);
         }


        console.log('Login completed');
      }
    );

   

  }

}
