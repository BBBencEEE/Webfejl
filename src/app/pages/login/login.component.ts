import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms'
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router, private authService: AuthService){}

  login() {
    this.authService.login(this.email.value as string,this.password.value as string).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/signup');
    }).catch(error => {
      console.error(error);
    });
  }
}
