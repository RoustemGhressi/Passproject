import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Dialog2Component } from './dialog2/dialog2.component';
import { WebRequestService } from 'src/app/web-request.service';
import {MatPaginator} from '@angular/material/paginator';
import {ViewChild} from '@angular/core';
import { Access } from './dialog2/access.model';
import {MatSort} from '@angular/material/sort';
import { AuthService } from 'src/app/auth.service';
import { Router, RouterLinkWithHref } from '@angular/router';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { SuppressionComponent } from './suppression/suppression.component';
import {SelectionModel} from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  
  privateForm!:FormGroup;
  accesstlist: Access[] = []
  displayedColumns: string[]= ['username', 'passwordA','hostA','portA','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  idr!:string ;
  isChecked!:boolean;
  chek!:boolean;
  
  
  value: string="* * * * * *";
  accesslist: Access[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  constructor(private dialog: MatDialog, private webservice: WebRequestService,
    private authService: AuthService,
    private router: Router,
    private formbuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.privateForm = this.formbuilder.group({
      privatekey:['']

      

      
    },)
    if(this.privateForm.get('privatekey')?.value===''){
      this.getallaccess();
    }
    
    

  }

  openDialog2() {
    this.webservice.getpublickey().subscribe();
    this.toastr.info('Clé public et privé sont téléchargés dans votre PC','Info')
    const dialogRef = this.dialog.open(Dialog2Component,{
      width: "30%"
    }).afterClosed().subscribe(val=>{
      if(val === 'Ajouter'){
        this.getallaccess()
      }
      }
      )}

    getallaccess(){
      this.webservice.getAccesses().subscribe(
        res=>{
          this.dataSource = new MatTableDataSource(res as Access[]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
          
        },
        err=>{}
      )
    }

    onlogout() {
      this.authService.removeSession();
      this.router.navigateByUrl('/login');
    }




    viewpass(row:any){
      for(let i =0 ; i<this.dataSource.data.length;i++){
        if(row._id===this.dataSource.data[i]._id){
          
      if(this.dataSource.data[i].passwordA!=""){
        
        if(this.value==="* * * * * *"){
          this.value=this.dataSource.data[i].passwordA;
          this.dataSource.data[i].view=true;
          console.log(row);
          
        }else if(this.value===this.dataSource.data[i].passwordA){
          
          this.value="* * * * * *";
          this.dataSource.data[i].view=false;
          console.log(row);
          console.log(this.dataSource.data)
          
        }
      }else{
        this.value="";
      }
  
  
    }
  }
      }

      checkValue(event: any){
        console.log(event);
     }
      
    
    
  

   

    editAccess(row : any){
   
      this.dialog.open(Dialog2Component,{
        width:'30%',
        data: row
      }).afterClosed().subscribe(val=>{
        if(val==="Modifier"){
          this.getallaccess();
        }
      })
    

    }

    delAccess(row : any){
   
      this.dialog.open(SuppressionComponent,{
        width:'30%',
        data: row,
         
      }).afterClosed().subscribe(val=>{
        if(val==="Supprimer"){
          this.getallaccess();
        }})
      }

      getaccessdecr(privatekey:string) {
        this.webservice.getAccessesdecr(privatekey).subscribe(
          res=>{
            
            this.toastr.success('Mot de pass decrypté avec succés','Succés')
            this.dataSource = new MatTableDataSource(res as Access[]);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
            this.privateForm.reset();
            if(res===null){
              this.toastr.warning('Données non valabale','Attention')
            }

          }
        )
      }
    }
    

      
    
      

    

  
