import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebRequestService } from 'src/app/web-request.service';


@Component({
  selector: 'app-suppression',
  templateUrl: './suppression.component.html',
  styleUrls: ['./suppression.component.css']
})
export class SuppressionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private webservice: WebRequestService, private dialogref:MatDialogRef<SuppressionComponent>) { }

  ngOnInit(): void {
  }

  deleteaccess(id: string){
    this.webservice.deleteAccess(id).subscribe(
      res=>{
        this.dialogref.close('Supprimer');
      },
      err=>{

      }
    )
  }
 

}


