import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { WebRequestService } from 'src/app/web-request.service';
import { AccessComponent } from '../access.component';


@Component({
  selector: 'app-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.css']
})


export class Dialog2Component implements OnInit {
  accessForm! : FormGroup;
  actionBtn : string = "Ajouter";
  sent: string = "Formule ajout d'accés"
   

  

  get passwordA(){
    return this.accessForm.get('passwordA');
  }
  get subscribe(){
    return this.accessForm.get('subscribe');
  }
  constructor(private dialogref:MatDialogRef<Dialog2Component>,private formbuilder: FormBuilder,public webservice: WebRequestService
    ,@Inject(MAT_DIALOG_DATA) public editData:any, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.accessForm = this.formbuilder.group({
      username: ['',Validators.required],
      passwordA : [''],
      hostA:[''],
      portA:[''],
      subscribe:[false],
      url:[false],
      publickey:['',Validators.required]

      

      
    },)

    //email address
    
    const passwordA = this.accessForm.get('passwordA');
    
    passwordA?.disable();
    const hostA = this.accessForm.get('hostA');
    const portA = this.accessForm.get('portA');
    const subscribe = this.accessForm.get('subscribe');
    subscribe?.setValidators(Validators.requiredTrue);
    const url = this.accessForm.get('url');
    url?.setValidators(Validators.requiredTrue);
    hostA?.disable();
    portA?.disable();
    
    
    this.accessForm.get('subscribe')?.valueChanges.subscribe(
      checkedValue =>{
        
        if(checkedValue){
          
          
          passwordA?.setValidators(Validators.required);
          
          passwordA?.enable();
          url?.clearValidators();

        }else if(!checkedValue){
          
          passwordA?.clearValidators();
          
          
          
         
          passwordA?.disable();
          url?.setValidators(Validators.requiredTrue);
          
        }
        
        passwordA?.updateValueAndValidity();
        url?.updateValueAndValidity();
      }
    )

    //URL
   
    
    this.accessForm.get('url')?.valueChanges.subscribe(
      checkedValue1 =>{
        
        
        if(checkedValue1){
          hostA?.setValidators(Validators.required);
          portA?.setValidators(Validators.required);
          hostA?.enable();
          portA?.enable();
          subscribe?.clearValidators();

        }else if(!checkedValue1){
          hostA?.clearValidators();
          portA?.clearValidators();
          hostA?.disable();
          portA?.disable();
          subscribe?.setValidators(Validators.requiredTrue);
          
        }
        hostA?.updateValueAndValidity();
        portA?.updateValueAndValidity();
        subscribe?.updateValueAndValidity();
      }
    )
    

    if(this.editData){
      console.log(this.editData);
      this.sent="Formule modification d'accés"
      this.actionBtn = "Modifier";
      this.accessForm.patchValue({
        username: this.editData.username,
        
        passwordA : this.editData.passwordA,

        hostA: this.editData.hostA,
        portA: this.editData.portA,
        subscribe: this.editData.subscribe,
        url: this.editData.url
      })
      
      
    }
    
  }

  AjouterAccess(){
    if(!this.editData){
    this.webservice.addAccess(this.accessForm.value).subscribe(
      res=>{
        this.accessForm.reset();
        this.dialogref.close('Ajouter');
        
        
      
      },err=>{}

      

    )
  }else{
    this.updateAccess();
  }
 
}

updateAccess(){
  this.webservice.updateAccess(this.accessForm.value, this.editData._id).subscribe(
    res=>{
      this.accessForm.reset()
      this.dialogref.close("Modifier");
      this.toastr.info('Modifié avec succées','Info');
    },
    err=>{}
  )

}




}

