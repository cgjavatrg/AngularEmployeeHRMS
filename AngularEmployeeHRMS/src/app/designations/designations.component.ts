import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.css']
})
export class DesignationsComponent implements OnInit {
  designations:string[];

  wait:boolean=false;

  constructor(private empService:EmployeeService) { }

  ngOnInit(): void {
    this.empService.getAlDistinctTitles().subscribe(
      (data)=> {
        this.designations=data;
    //    this.wait=true;
      },
      (error)=>{
        console.log(error);
     //   this.wait=true;
      },
      ()=>{
        this.wait=true;
        console.log("Fetching designations completed");
      }
    );
  }

}
