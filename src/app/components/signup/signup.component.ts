import { Component, OnInit } from '@angular/core';
import { UserRepository } from '../../domain/user-repository';
import { ActivatedRoute, Router } from '@angular/router';
import {
    EmailValidator,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  constructor(
    private userRepository: UserRepository,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public full_name: string;
  public address: string;
  public emailS: string;
  public password1: string;
  public password2: string;
  public accountType: string;
  public username: string;
  public location: string;
  public description: string;


  ngOnInit() {

  }






  public submitSignupUser() {
    console.log(this.emailS);
    console.log(this.password1);
    console.log(this.password2);
    console.log(this.full_name);
    console.log(this.address);
    console.log(this.accountType);

    const user = {
      user_password: this.password1,
      email:  this.emailS,
      address: this.address,
      full_name: this.full_name,
      username: this.username,
      favorite_garage: 0
    };

    this.userRepository.signup(user).subscribe(res => {
      // console.log('res: ', res);
      this.router.navigateByUrl('login');
    });
  }

  public submitSignupGarage() {

    console.log('this.description: ', this.description)

    const garage = {
      garage_password: this.password1,
    garage_name: this.full_name,
    garage_email: this.emailS,
    garage_location: this.location,
    garage_description: this.description
    };

    this.userRepository.signupGarage(garage).subscribe(res => {
      console.log('res: ', res);
      this.router.navigateByUrl('login');
    });
  }

  public submitSignup() {
    if(this.accountType === "Consumer"){
      this.submitSignupUser();
    }  else {
      this.submitSignupGarage();
    }
  }



}

export class accountType{
  public name:string;
  public id:number;
}
