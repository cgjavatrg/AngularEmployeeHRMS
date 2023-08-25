import { Component, OnInit } from '@angular/core';
import { DeptManagerS } from '../model/dept-manager-s';
import { DepartmentProducerS } from '../model/department-producer-s';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../service/department.service';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-assignmanager',
  templateUrl: './assignmanager.component.html',
  styleUrls: ['./assignmanager.component.css']
})
export class AssignmanagerComponent implements OnInit {
  deptmgrList:DeptManagerS[];
  deptList:DepartmentProducerS[];

  deptmgr:DeptManagerS=new DeptManagerS();

  today:Date=new Date();
  dp:DatePipe=new DatePipe("en-US");
  dateStr:string=this.dp.transform(this.today,"yyyy-MM-dd");

  assignmgrform=new FormGroup({
    deptNo:new FormControl('' , [Validators.required] ),  
    empNo:new FormControl('',[Validators.required , Validators.pattern("\\d+") ])  ,
    fromDate:new FormControl(this.dateStr,[Validators.required]),
    toDate:new FormControl('9999-01-01',[Validators.required])
     });  

     errorMsg:string;
     status:string;

  constructor(private deptService:DepartmentService,private adminService:AdminService) { }

  ngOnInit(): void {
    this.deptService.getAllDepartments().subscribe(
      (data)=>{
        this.deptList=data;
      }
    );
  }

  get EmpNo(){  
    return this.assignmgrform.get('empNo');  
  }  

  get DeptNo(){  
    return this.assignmgrform.get('deptNo');  
  }  

  
  get FromDate(){  
    return this.assignmgrform.get('fromDate');  
  }  

  get ToDate(){  
    return this.assignmgrform.get('toDate');  
  }  

  checkRecords():void{
    console.log("Emp no "+this.EmpNo.value);
    this.adminService.getDeptManagerByDeptNo(this.DeptNo.value).subscribe(
      (data)=>{
        this.deptmgrList=data;
      },
      (error)=>{
        this.deptmgrList=[];
        console.log(error);
      },
      ()=> {
        console.log("Dept Emp completed");
      }
    );

  }

  assignManagerToDepartment() :void {
    this.deptmgr.deptManagerPK.deptNo=this.DeptNo.value;
    this.deptmgr.deptManagerPK.empNo= this.EmpNo.value;
    this.deptmgr.fromDate=this.FromDate.value;
    this.deptmgr.toDate=this.ToDate.value;
    this.adminService.assignManagerToDepartment(this.deptmgr).subscribe(
      (data)=>{
        this.status=data;
        this.checkRecords();
      },
      (error) =>{
        this.errorMsg=error;
      },
      ()=> {
        this.errorMsg=null;
      }
    );
  }

}
