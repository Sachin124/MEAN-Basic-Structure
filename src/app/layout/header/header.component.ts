import {
  Component,
  OnInit
} from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import {
  Observable
} from 'rxjs';
import {
  DataService
} from '../../service/data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isHandset: Observable < BreakpointState > = this.breakpointObserver.observe(Breakpoints.Handset);
  rows: any;
  constructor(private breakpointObserver: BreakpointObserver, private dataService: DataService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.getData().subscribe(res => {
      console.log(res);

      this.rows = res;
    })
  }


  addAngular(value) {
    console.log(value);
    
    this.dataService.saveData(value).subscribe(res => {
      console.log(res);
      this.getData();
    }, error => {
      console.log(error);
    })
  }

}