import { Component, OnInit } from '@angular/core';
import { EmployeeDeptDTO } from '../model/employee-dept-dto';
import { EmployeeService } from '../service/employee.service';
import { DepartmentProducerS } from '../model/department-producer-s';
import { DepartmentService } from '../service/department.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-dept',
  templateUrl: './employee-dept.component.html',
  styleUrls: ['./employee-dept.component.css']
})
export class EmployeeDeptComponent implements OnInit {
  empDeptList:EmployeeDeptDTO[];
  deptList:DepartmentProducerS[];

  errMsg:string;

  today:Date=new Date();
  dp=new DatePipe("en-US");
  dateStr:string=this.dp.transform(this.today,"yyyy-MM-dd");
  fromDate:string=this.dateStr;

  deptNo:string;

  pageOfItems: Array<any>;

  wait:boolean=true;

  constructor(private empService:EmployeeService,private deptService:DepartmentService) { }

  ngOnInit(): void {
    console.log("From Date "+this.fromDate) ;
    this.deptService.getAllDepartments().subscribe(
      (data)=>{
        this.deptList=data;
      }
    );
  }

  loadEmployeesDept():void{
   // console.log(this.deptNo.trim());
    console.log("From date is "+this.fromDate);
    this.empService.getEmployeeByDeptAndFromDate(this.deptNo,this.fromDate).subscribe(
      (data)=> {
        this.wait=false;
        this.empDeptList=data;
     
      },
      (error) =>{
        this.empDeptList=[];
        this.errMsg=error;
        this.wait=false;
      },
      ()=>{
        this.wait=true;
        this.errMsg=null;
        console.log("Emp dept completed");
      }


    );
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}
