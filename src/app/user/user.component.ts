import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { WebRequestService } from '../web-request.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { User } from './user.model';
import { Project } from './dialog/project.model';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AccessComponent } from './access/access.component';
import { SuppressionPComponent } from './suppression-p/suppression-p.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  id!:string;

  displayedColumns: string[] = ['projectName','Company','Category', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userlist: User[] = [];
  projectlist: Project[] = []
  totalRecords: any;
  page: number = 1;

  constructor(
    private userservice: UserService,
    private authService: AuthService,
    private router: Router,
    private webservice: WebRequestService,
    private dialog: MatDialog,
    //@Inject(MAT_DIALOG_DATA) public editData:any
  ) {}

  ngOnInit(): void {
    this.refreshUsers();
    this.getallproject();

    //window.onblur = this.newTabaction;
  }

  //newTabaction() {
    //localStorage.removeItem('token');
    //localStorage.removeItem('userId');
    //localStorage.removeItem('qrconfirm');
    //window.location.replace('/login');
  //}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      width: "30%"
    }).afterClosed().subscribe(val=>{
       if(val === 'Créer'){
        this.getallproject()
      }
    });

    
  }

  openAccess(id: string){
    this.router.navigate(['access']);
}

  onlogout() {
    this.authService.removeSession();
    this.router.navigateByUrl('/login');
  }

  refreshUsers() {
    this.webservice.getusers().subscribe((res) => {
      this.userlist = res as User[];
      this.totalRecords = this.userlist.length;
    });
  }

  getallproject(){
    this.webservice.getProjects().subscribe(
      
      res=>{
        this.dataSource = new MatTableDataSource(res as Project[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
        
        
      },
      err=>{}
    )
  }

 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProject(row : any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val==="Modifier"){
        this.getallproject();
      }
    })
  }

  delProject(row : any){
    this.dialog.open(SuppressionPComponent,{
      width:'30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val==="Supprimer"){
        this.getallproject();
      }})
    }
}


