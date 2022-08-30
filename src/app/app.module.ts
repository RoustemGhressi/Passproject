import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentifComponent } from './authentif/authentif.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TwofactorComponent } from './twofactor/twofactor.component';
import { AuthguardGuard } from './authentif/authguard.guard';
import { AuthService } from './auth.service';
import { UserService } from '../app/user/user.service';
import { UserComponent } from './user/user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './user/dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { AccessComponent } from './user/access/access.component';
import { Dialog2Component } from './user/access/dialog2/dialog2.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SuppressionComponent } from './user/access/suppression/suppression.component';
import { SuppressionPComponent } from './user/suppression-p/suppression-p.component';
import { TableComponent } from './table/table.component';
import { RegisterComponent } from './user/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthentifComponent,
    UserComponent,
    TwofactorComponent,
    DialogComponent,
    AccessComponent,
    Dialog2Component,
    SuppressionComponent,
    SuppressionPComponent,
    TableComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    ToastrModule.forRoot(),
    MatCheckboxModule
    
  ],
  providers: [AuthguardGuard, AuthService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}

