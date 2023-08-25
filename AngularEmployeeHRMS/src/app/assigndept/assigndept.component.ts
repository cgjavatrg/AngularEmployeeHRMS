import { Component, OnInit } from '@angular/core';
import { DeptEmpProducerS } from '../model/dept-emp-producer-s';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentProducerS } from '../model/department-producer-s';
import { DepartmentService } from '../service/department.service';
import { AdminService } from '../service/admin.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-assigndept',
  templateUrl: './assigndept.component.html',
  styleUrls: ['./assigndept.component.css']
})
export class AssigndeptComponent implements OnInit {
  deptEmpProducerSList:DeptEmpProducerS[];
  deptList:DepartmentProducerS[];

  deptEmpProducerS:DeptEmpProducerS=new DeptEmpProducerS();

  today:Date=new Date();
  dp:DatePipe=new DatePipe("en-US");
  dateStr:string=this.dp.transform(this.today,"yyyy-MM-dd");

  assigndeptform=new FormGroup({
    empNo:new FormControl('',[Validators.required , Validators.pattern("\\d+") ])  ,
    deptNo:new FormControl('' , [Validators.required] ),  
    fromDate:new FormControl(this.dateStr,[Validators.required]),
    toDate:new FormControl('9999-01-01',[Validators.required])
     });  

     errorMsg:string;
     status:string;


   

  constructor(private deptService:DepartmentService,private adminService:AdminService) { 

  }

  ngOnInit(): void {
    this.deptService.getAllDepartments().subscribe(
      (data)=>{
        this.deptList=data;
      }
    );
  }

  get EmpNo(){  
    return this.assigndeptform.get('empNo');  
  }  

  get DeptNo(){  
    return this.assigndeptform.get('deptNo');  
  }  

  
  get FromDate(){  
    return this.assigndeptform.get('fromDate');  
  }  

  get ToDate(){  
    return this.assigndeptform.get('toDate');  
  }  

  checkRecords():void{
    console.log("Emp no "+this.EmpNo.value);
    this.adminService.getEmpDeptByEmpno(this.EmpNo.value).subscribe(
      (data)=>{
        this.deptEmpProducerSList=data;
      },
      (error)=>{
        this.deptEmpProducerSList=[];
        console.log(error);
      },
      ()=> {
        console.log("Dept Emp completed");
      }
    );

  }

  assignDepartmentToEmployee():void {
    console.log(this.EmpNo.value);
    this.deptEmpProducerS.deptEmpPK.empNo=this.EmpNo.value;
    this.deptEmpProducerS.deptEmpPK.deptNo=this.DeptNo.value;
    this.deptEmpProducerS.fromDate=this.FromDate.value;
    this.deptEmpProducerS.toDate=this.ToDate.value;
    this.adminService.assignDepartment(this.deptEmpProducerS).subscribe(
      (data)=>{
        this.status=data;
        this.checkRecords();
      },
      (error)=>{
        this.errorMsg=error;
      },
      ()=>{
        this.errorMsg=null;
      }

    );

    
  }
}
