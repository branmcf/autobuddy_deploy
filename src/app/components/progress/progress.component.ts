import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  constructor() { }
  @Input()
  public progress:number;
  ngOnInit() {

  }

}
