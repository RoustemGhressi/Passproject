import { Component, OnInit } from '@angular/core';
import { Access } from '../user/access/dialog2/access.model';
import { WebRequestService } from '../web-request.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  accesslist: Access[] = []
  value:string="* * * * * *";
  idr!:string;
  constructor(private webservice: WebRequestService) { }

  ngOnInit(): void {
    this.getallaccess();

    
    
  
  }

  getallaccess(){
    this.webservice.getAccesses().subscribe(
      (res)=>{
       this.accesslist=res as Access[];
      },
      err=>{}
    )
    
  }

  viewpass(access:Access){
    this.idr=access._id;
    if(access.passwordA!=""){
      
      if(this.value==="* * * * * *"){
        this.value=access.passwordA;
      }else if(this.value===access.passwordA){
        
        this.value="* * * * * *";
        console.log(access);
        
      }
    }else{
      this.value="";
    }


      
    }
      
      

      
    }

