import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-deleteemp',
  templateUrl: './deleteemp.component.html',
  styleUrls: ['./deleteemp.component.css']
})
export class DeleteempComponent implements OnInit {
  empNo:number;
  errMsg:string;
  status:string;

  constructor(private adminservice:AdminService) { }

  ngOnInit(): void {
  }

  deleteEmployee():void{
    this.adminservice.deleteEmployee(this.empNo).subscribe(
      (data)=>{
        this.status=data;
      },
      (error)=>{
        this.errMsg=error;
        this.status=null;
      },
      ()=>{
        this.errMsg=null
      }

    );
  }
}
