import { UserService } from 'src/app/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy{
  authListnerSubs: any=null;
userIsAuthenticated=false;
adminIsAuthenticated=false;
  constructor(private authService:UserService) { }

  isopen:boolean=false;
  togglenav(){
    this.isopen=!this.isopen;
  }
  ngOnInit() {
    this.userIsAuthenticated=this.authService.getIsAuth();
    this.adminIsAuthenticated=this.authService.getIsAdminAuth();
    
this.authListnerSubs=this.authService.getAuthStatusListner()
.subscribe(isAuthenticated=>{
 this.userIsAuthenticated=isAuthenticated;
 console.log("user:"+isAuthenticated);
});


this.authListnerSubs=this.authService.getAuthStatusListner()
.subscribe(isAdmin=>{
this.adminIsAuthenticated=isAdmin;
  console.log("admin:"+isAdmin);
});

  }
  onLogout(){
    this.authService.logout();
 
  }
  ngOnDestroy(){
  
    this.authListnerSubs.unsubscribe();
 
  }

}
