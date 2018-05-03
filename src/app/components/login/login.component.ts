import { UserRepository } from './../../domain/user-repository';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarRepository } from '../../domain/car-repository';
import { CarRepairsComponent } from '../car-repairs/car-repairs.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public showNav: boolean;
  public isGarage: boolean;

  constructor(
    private userRepository: UserRepository,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.showNav = true;
    this.isGarage=false;
  }

  public submitLogin() {
    console.log(this.email);
    console.log(this.password);

    if(this.isGarage){
      const garage = {
        garage_email: this.email,
        garage_password: this.password
      };
      this.userRepository.loginAsGarage(garage).subscribe(res => {
        console.log("garage:",garage);
        console.log("loginResponseGarage: ", res);
        if(res.id==0){
          this.router.navigateByUrl('login')
        }
        else{
          this.router.navigateByUrl('garage');
        }
      })
    }
    else{
      const user = {
        email: this.email,
        user_password: this.password

      };
    this.userRepository.login(user).subscribe(res => {
      console.log('user:',user);
      console.log('loginRes: ', res);
      if(res.id==0){
        this.router.navigateByUrl('login');
      }
      else{
        this.router.navigateByUrl('garage');

      }
    });
  }
  }



}
