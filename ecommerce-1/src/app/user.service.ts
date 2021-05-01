import { AuthData } from './components/login/auth-data.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SignupData } from './components/signup/signup-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private token:any;
   private authStatusListner=new Subject<boolean>();
   private isAuthenticated = false;
 private isAdmin=false;
   private tokenTimer:any;
   private userMail:string="";
  constructor(private _http:HttpClient,private _router:Router) { }
  getToken(){
    return this.token;
  }
  getIsAuth(){
    return this.isAuthenticated;
  }
  getIsAdminAuth(){
    return this.isAdmin;
  }
  getUserMail(){
    return this.userMail;
  }
  getAuthStatusListner(){
  return this.authStatusListner.asObservable();
  }

  getUserByEmail(body:any){
    //console.log(body);
    return this._http.post("http://localhost:3000/api/getuserbyemail",{"email":body});

  }
  signup(username:string,phnnumber:string,email:string,password:string){
    const authData: SignupData = { username:username,phnnumber:phnnumber,email: email, password: password };
    this._http
      .post("http://localhost:3000/api/signup", authData)
      .subscribe(() => {
        this._router.navigate(["/login"]);
      }, error => {
        this.authStatusListner.next(false);
      });
  }

  
  login(email:string,password:string){
    const authdata:AuthData={email:email,password:password};
    this._http.post<{token:string,expiresIn:number,emailId:string}>('http://127.0.0.1:3000/api/login',authdata)
    .subscribe(
      response=>{
        const token = response.token;
        this.token=token;
        if(token){
        const expiresInDuration=response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.tokenTimer=setTimeout(()=>{
          this.logout();
        },expiresInDuration*1000);
        this.isAuthenticated=true;
        window.localStorage.setItem('email',response.emailId);
        this.userMail=response.emailId;
         console.log(this.userMail);
        this.authStatusListner.next(true);
        const time=new Date();
        const expirationDate=new Date(time.getTime()+expiresInDuration*1000);
        this.saveAuthData(token,expirationDate);
         console.log(expirationDate);
        if(authdata.email=="admin@gmail.com"){
         this.isAdmin=true;
     
          this._router.navigate(['/admin']);
        }else{
        this.isAdmin=false;
       this._router.navigate(['/']);
      }
    }
    },error =>{
      this.authStatusListner.next(false);
    });
  }

 
  
    autoAuthUser() {
      const authInformation = this.getAuthData();
      if (!authInformation) {
        return;
      }
      const now = new Date();
      const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.token = authInformation.token;
        this.isAuthenticated = true;
    
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListner.next(true);
      }
    }
  

  logout(){
    this.token=" ";
    this.isAuthenticated=false;
    this.isAdmin=false;
    this.tokenTimer=0;
    this.authStatusListner.next(false);
    this.clearAuthData();
    window.localStorage.removeItem('email');
    this._router.navigate(['/login']);
  }
  
  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token:string,expirationTime:Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationTime.toISOString());
  }
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
  private getAuthData(){
    const time=new Date();
    const token=localStorage.getItem("token");
    const expirationDate:any=localStorage.getItem("expiration");
    if(!token && !expirationDate){
      return;
    }
    return{
      token:token,
      expirationDate:new Date(expirationDate)
    }
  }
}
