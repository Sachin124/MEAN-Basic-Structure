import {
  Component,
  OnInit
} from '@angular/core';
import {
  DataService
} from 'src/app/service/data.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  empData = {};
  constructor(private dataService: DataService) {}

  ngOnInit() {}

  addEmployee(value) {
    console.log(value);
    this.dataService.addEmployee(value).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    })
  }
}