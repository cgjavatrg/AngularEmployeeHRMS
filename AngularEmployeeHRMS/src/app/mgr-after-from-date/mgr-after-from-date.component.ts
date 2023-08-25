import { Component, OnInit } from '@angular/core';
import { EmployeeDTO } from '../model/employee-dto';
import { DatePipe } from '@angular/common';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-mgr-after-from-date',
  templateUrl: './mgr-after-from-date.component.html',
  styleUrls: ['./mgr-after-from-date.component.css']
})
export class MgrAfterFromDateComponent implements OnInit {
  errMsg:string;

  today:Date=new Date();
  dp:DatePipe=new DatePipe("en-US");
  dateStr:string=this.dp.transform(this.today,"yyyy-MM-dd");
  fromDate:string= this.dateStr;

  empdtoList:EmployeeDTO[];

  pageOfItems: Array<any>;

  wait:boolean=true;

  constructor(private empService:EmployeeService) { }

  ngOnInit(): void {
  }

  changeWait(){
    this.wait=false;
  }

  loadManagersAfterFromDate():void{
    this.changeWait();
    this.empService.getAllManagersAfterFromDate(this.fromDate).subscribe(
      (data)=>{
        this.empdtoList=data;
      },
      (error)=> {
        this.errMsg=error;
        this.empdtoList=[];
        this.wait=false;
      },
      ()=>{
        this.errMsg=null;
        this.wait=true;
      }
    );
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}
