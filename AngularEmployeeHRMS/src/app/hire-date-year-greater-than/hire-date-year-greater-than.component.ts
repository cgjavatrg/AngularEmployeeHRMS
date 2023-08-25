import { Component, OnInit } from '@angular/core';
import { EmployeeDTO } from '../model/employee-dto';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-hire-date-year-greater-than',
  templateUrl: './hire-date-year-greater-than.component.html',
  styleUrls: ['./hire-date-year-greater-than.component.css']
})
export class HireDateYearGreaterThanComponent implements OnInit {
  errMsg:string;
  year:number;
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

  getEmployeesAfterHireDateYear():void{
    this.changeWait();
    this.getCountOfEmployeesAfterHireDateYear();

    this.adminservice.getEmployeesByHireDateYearGreaterThan(this.year).subscribe(
      (data)=>{
        this.empdtoList=data;
      },
      (error)=>{
        this.empdtoList=[];
        this.errMsg=error;
        this.changeWait();
      },
      ()=> {
        this.errMsg=null;
        this.wait=true;
      }
    );

  }

  getCountOfEmployeesAfterHireDateYear():void {
    this.adminservice.getCountOfEmployeesByHireDateYearGreaterThan(this.year).subscribe(
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
