import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Project } from './user/dialog/project.model';
import { Access } from './user/access/dialog2/access.model';
@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  selectedProject: Project = {
    projectName:'',
    Company:'',
    Category:'',
  };

  selectedAccess: Access = {
    _id:'',
    username:'',
    passwordA:'',
    view:false,
    hostA:'',
    portA:'',
    subscribe:false,
    url: false,
    publickey:'',
    privatekey:''
  };

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:4000/api';
  }

  login(email: string, password: string) {
    return this.http.post(
      `${this.ROOT_URL}/authenticate`,
      {
        email,
        password,
      },
      { observe: 'response' }
    );
  }

  gototwofactor(token: any) {
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.ROOT_URL}/jwtAuth`, { headers: headers });
  }

  generateQrcode(userId: any) {
    return this.http.post(
      `${this.ROOT_URL}/qrcode`,
      {
        userId,
      },
      { observe: 'response' }
    );
  }

  VerifyToken(userId: any, token: any) {
    return this.http.post(
      `${this.ROOT_URL}/twoFauthVerify`,
      {
        userId,
        token,
      },
      { observe: 'response' }
    );
  }

  getusers() {
    return this.http.get(`${this.ROOT_URL}/users`);
  }

  addProject(Project: Project){
    return this.http.post(
      `${this.ROOT_URL}/ajouterprojet`,Project);
  }

  getProjects(){
    return this.http.get(`${this.ROOT_URL}/Afficher`);
  }

  updateProject(Project:Project, id: string){
    return this.http.put(`${this.ROOT_URL}/${id}`,Project);

  }

  updateAccess(Access:Access, id: string){
    return this.http.put(`${this.ROOT_URL}/Access/${id}`,Access);

  }

  deleteProject(id: string){
    return this.http.delete(`${this.ROOT_URL}/${id}`)
  }

  addAccess(Access: Access){
    return this.http.post(
      `${this.ROOT_URL}/ajouterAccess`,Access);
  }

  getAccesses(){
    return this.http.get(`${this.ROOT_URL}/afficherAccess`);
  }

  deleteAccess(id: string){
    return this.http.delete(`${this.ROOT_URL}/deleteAccess/${id}`)
  }

  OneToMany(idP: string, idA: string){
    return this.http.get(`${this.ROOT_URL}/get/${idP}/${idA}`)
  }

  DelAccesses(){
    return this.http.delete(`${this.ROOT_URL}/DelAllAccess`);
  }

  getoneAccess(id: string){
    return this.http.get(`${this.ROOT_URL}/afficherAccess/${id}`);
  }
  getpublickey(){
    return this.http.get(`${this.ROOT_URL}/publicprivatekey`);
  }

  getAccessesdecr(privatekey:string){
    return this.http.put(`${this.ROOT_URL}/afficherAccessdecr`,{
      privatekey
    }
    
    );
  }

  register(nom:string,prenom:string,email:string,password:string){
    return this.http.post(`${this.ROOT_URL}/Register`,{
      nom,
      prenom,
      email,
      password
    },{
      observe:"response"
    })
  }
}

