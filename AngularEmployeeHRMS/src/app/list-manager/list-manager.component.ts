import { Component, OnInit } from '@angular/core';
import { ManagerDetailsDTO } from '../model/manager-details-dto';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.css']
})
export class ListManagerComponent implements OnInit {
  mgrlist:ManagerDetailsDTO[];
  pageOfItems: Array<any>;

  constructor(private empService:EmployeeService) { }

  ngOnInit(): void {
    this.loadManagers();
   }
 
   loadManagers():void {
     this.empService.getAllManagers().subscribe(
       (data)=> {
         this.mgrlist=data;
       }
     );
   }

   onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
   

}
