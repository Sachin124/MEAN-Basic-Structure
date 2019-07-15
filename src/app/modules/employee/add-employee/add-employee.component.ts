import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
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
  @Input() editEmployeeData: any;
  @Output() addEmployee = new EventEmitter();
  constructor(private dataService: DataService) {}

  ngOnInit() {
    if (this.editEmployeeData) {
      this.empData = this.editEmployeeData;
    }
  }

  addEmpData(value) {
    console.log(value);
    this.addEmployee.emit(value)
    // this.dataService.addEmployee(value).subscribe(res => {
    //   console.log(res);
    // }, error => {
    //   console.log(error);
    // })
  }

  editEmployee(value){
    this.dataService.editEmployee(this.editEmployeeData._id, value).subscribe(res=>{
      console.log(res);      
    },error=>{
      console.log(error);      
    })
  }
}