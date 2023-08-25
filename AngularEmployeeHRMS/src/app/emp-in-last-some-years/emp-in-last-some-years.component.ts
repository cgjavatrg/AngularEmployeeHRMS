import { Component, OnInit } from '@angular/core';
import { EmployeeDTO } from '../model/employee-dto';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-emp-in-last-some-years',
  templateUrl: './emp-in-last-some-years.component.html',
  styleUrls: ['./emp-in-last-some-years.component.css']
})
export class EmpInLastSomeYearsComponent implements OnInit {
  errMsg:string;
  noofyears:number;
  empdtoList:EmployeeDTO[];
  count:number;

  pageOfItems: Array<any>;

  wait:boolean=true;

  constructor(private adminservice:AdminService) { }

  ngOnInit(): void {
  }

  changeWait(){
    this.wait=false;
  }

  getEmployeesInLastSomeYears():void{
    this.changeWait();
    this.getCountOfEmployeesInLastSomeYears();

    this.adminservice.getEmployeesByLastSomeYears(this.noofyears).subscribe(
      (data)=>{
          this.empdtoList=data;
      },
      (error)=>{
        this.empdtoList=[];
       this.errMsg=error;
        this.wait=false;
      },
      ()=> {
        this.errMsg=null;
        this.wait=true;
      }
    );

  }

  getCountOfEmployeesInLastSomeYears():void {
    this.adminservice.getCountOfEmployeesByLastSomeYears(this.noofyears).subscribe(
      (data)=> {
        this.count=data;
      },
      (error)=>{
        this.errMsg=error;
      },
      ()=>{
        this.errMsg=null;
      }
    );
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}
