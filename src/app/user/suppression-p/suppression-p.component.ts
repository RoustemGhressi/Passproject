import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebRequestService } from 'src/app/web-request.service';

@Component({
  selector: 'app-suppression-p',
  templateUrl: './suppression-p.component.html',
  styleUrls: ['./suppression-p.component.css']
})
export class SuppressionPComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private webservice: WebRequestService, private dialogref:MatDialogRef<SuppressionPComponent>) { }

  ngOnInit(): void {
  }
  deleteproject(id: string){
    this.webservice.deleteProject(id).subscribe(
      res=>{
        
        this.delAllAccess();
        this.dialogref.close('Supprimer');
        
      },
      err=>{

      }
    )
  }

  delAllAccess(){
    this.webservice.DelAccesses().subscribe(
      res=>{
        console.log(res);
      }
    );
  }
}
