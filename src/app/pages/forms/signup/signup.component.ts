import { Component } from '@angular/core';
import { and } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/User'
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });


  constructor(private authService: AuthService, private router: Router, private userService: UserService){}

  async signup(){
    let email = this.signUpForm.get('email')?.value;
    let password = this.signUpForm.get('password')?.value;
    if((typeof email === "string") && (typeof password === "string")){
      //this.authService.signup(email,password);
      const user: User = {
        id: '1',
        email: this.signUpForm.get('email')?.value as string,
        username: this.signUpForm.get('email')?.value?.split('@')[0] as string,
        name: {
          firstname: this.signUpForm.get('name.firstname')?.value as string,
          lastname: this.signUpForm.get('name.lastname')?.value as string,
        }
      };
      this.userService.create(user).then(_ => {
        console.log("user added successfully")
      }).catch(error => {
        console.error(error);
      }
      );
      this.router.navigateByUrl('/login');
    }else{
      console.error("hiba a regisztráció során");
    }
  }

}
