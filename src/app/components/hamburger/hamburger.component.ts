import { Component, OnInit } from '@angular/core';
import {trigger, style, animate, transition} from '@angular/animations';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { checkAndUpdateView } from '@angular/core/src/view/view';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css']
})
export class HamburgerComponent implements OnInit {
  public nav:string;
  public isLoggedIn: boolean;
  openNav($event){

    this.nav = $event.type == 'mouseenter' ? 'btn active' : 'btn';
  }
  constructor(private router: Router) {
    this.router = router;
    router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        this.checkNav();
      }
      if (event instanceof NavigationEnd) {
        this.checkNav();
      }
      if (event instanceof NavigationError) {
        this.checkNav();
        console.log(event.error);
      }
  });
}

  ngOnInit() {
    this.nav="btn";
  }

  public checkNav() {
    console.log('Called Check Nav')
    const loggedOutRoutes = [
      '/landing',
      '/login',
      '/signup'
    ];

    if (loggedOutRoutes.includes(this.router.url)) {
      this.isLoggedIn = false; 
    }
    else {
      this.isLoggedIn = true;
    }
  }

}
