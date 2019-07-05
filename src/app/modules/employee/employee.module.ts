import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { RouterModule } from '@angular/router';
import { EmployeeRouting } from './employee-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddEmployeeComponent, ViewEmployeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeRouting),
    ModalModule.forRoot(),
    FormsModule
  ]
})
export class EmployeeModule { }
