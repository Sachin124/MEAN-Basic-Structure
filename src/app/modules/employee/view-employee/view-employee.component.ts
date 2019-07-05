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
    this.modalRef = this.modalService.show(template);
  }
}
