import { Component, OnInit } from '@angular/core';
import { TitleProducerS } from '../model/title-producer-s';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-assigntitle',
  templateUrl: './assigntitle.component.html',
  styleUrls: ['./assigntitle.component.css']
})
export class AssigntitleComponent implements OnInit {
  titleProducerList:TitleProducerS[];
  titleList:string[];

  titleProducerS:TitleProducerS=new TitleProducerS();

  today:Date=new Date();
  dp:DatePipe=new DatePipe("en-US");
  dateStr:string=this.dp.transform(this.today,"yyyy-MM-dd");

  assigntitleform=new FormGroup({
    empNo:new FormControl('',[Validators.required , Validators.pattern("\\d+") ])  ,
    title:new FormControl('' , [Validators.required] ),  
    fromDate:new FormControl(this.dateStr,[Validators.required]),
    toDate:new FormControl('9999-01-01',[Validators.required])
     });  

     errorMsg:string;
     status:string;


  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getAlDistinctTitles().subscribe(
      (data)=>{
        this.titleList=data;
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log("Get all titles completed");
      }
    );
  }

  get EmpNo(){  
    return this.assigntitleform.get('empNo');  
  }  

  get Title(){  
    return this.assigntitleform.get('title');  
  }  

  
  get FromDate(){  
    return this.assigntitleform.get('fromDate');  
  }  

  get ToDate(){  
    return this.assigntitleform.get('toDate');  
  }  

  checkRecords():void{
    this.adminService.getAllTitlesByEmpNo(this.EmpNo.value).subscribe(
      (data)=>{
        this.titleProducerList=data;
      },
      (error)=>{
        this.titleProducerList=[];
        console.log(error);
      },
      ()=>{
        console.log("Get All TitleProducerList completed");
      }
    );
  }

  assignTitleToEmployee():void {
    this.titleProducerS.titlesPK.empNo=this.EmpNo.value;
    this.titleProducerS.titlesPK.title=this.Title.value;
    this.titleProducerS.titlesPK.fromDate = this.FromDate.value;
    this.titleProducerS.toDate = this.ToDate.value;
    this.adminService.assignTitle(this.titleProducerS).subscribe(
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
