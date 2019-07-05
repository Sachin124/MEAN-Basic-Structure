import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  rows: any;
  modalRef: BsModalRef;
  editEmployeeData: any;
  constructor(private dataService : DataService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee(){
    this.dataService.getEmployee().subscribe(res=>{
      console.log(res);      
      this.rows = res;
    },error=>{
      console.log(error);      
    })
  }  


  openModal(template: TemplateRef<any>) {
    this.editEmployeeData = null;
    this.modalRef = this.modalService.show(template);
  }

  onClose(){
    this.modalRef.hide();
  }

  addEmployee(value) {
    console.log(value);
    this.dataService.addEmployee(value).subscribe(res => {
      console.log(res);
      this.onClose();
      this.getEmployee();
    }, error => {
      console.log(error);
    })
  }

  editEmployee(template: TemplateRef<any>,editData){
    console.log(editData);
    this.editEmployeeData = null;

    this.editEmployeeData = editData;    
    this.modalRef = this.modalService.show(template);
  }


}
