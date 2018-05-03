import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  showBg: Boolean = false;
  height: any;
  width: any;

  constructor() {
    this.height = (window.screen.height) + 'px';
    this.width = (window.screen.width) + 'px';
      console.log(this.height);
      console.log(this.width);
  }

  ngOnInit() {
    // this.AppComponent.showBg = false;
  }

}
