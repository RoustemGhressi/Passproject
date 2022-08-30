import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { WebRequestService } from 'src/app/web-request.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent implements OnInit {

  projectForm !: FormGroup;
  sent: string = "Formule création du projet";
  actionBtn : string = "Créer";
  constructor(private dialogref:MatDialogRef<DialogComponent>, private formbuilder: FormBuilder ,public webservice: WebRequestService,
    @Inject(MAT_DIALOG_DATA) public editData:any,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.projectForm = this.formbuilder.group({
      projectName : ['',Validators.required],
      Company : ['', Validators.required],
      Category: ['',Validators.required]
    })

      if(this.editData){
        console.log(this.editData);
        this.sent="Formule modification du projet"
        this.actionBtn = "Modifier";
        this.projectForm.controls["projectName"].setValue(this.editData.projectName);
        this.projectForm.controls["Company"].setValue(this.editData.Company);
        this.projectForm.controls["Category"].setValue(this.editData.Category);
        
      }


  }

  AjouterProject(){
    if(!this.editData){
    this.webservice.addProject(this.projectForm.value).subscribe(
      res=>{
        this.projectForm.reset();
        this.dialogref.close('Créer');
      },
      err=>{}

    )
  }else{
    this.updateProject();
  }

}

updateProject(){
  this.webservice.updateProject(this.projectForm.value, this.editData._id).subscribe(
    res=>{
      this.dialogref.close("Modifier");
      this.toastr.info('Modifié avec succées','Info');
    },
    err=>{}
  )

}

}
