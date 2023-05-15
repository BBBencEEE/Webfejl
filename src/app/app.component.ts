import { Component,Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'v2';
  @Output() loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(){
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user',JSON.stringify(this.loggedInUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user',JSON.stringify('null'));
    });
  }

  logout(){
    this.authService.logout().then(() => {
      console.log('Kijelentkezve');
    }).catch(error => {
      console.error(error);
    });
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}
