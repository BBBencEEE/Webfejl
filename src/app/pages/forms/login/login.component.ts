import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  email = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router){}

  login() {
    console.log(this.email.value)
    /*
    try {
      //await this.authService.login(this.email.value, this.password.value);
      this.router.navigateByUrl('/dashboard');
    } catch (error) {
      console.error('Sikertelen bejelentkezés', error);
    }*/
  }
}
