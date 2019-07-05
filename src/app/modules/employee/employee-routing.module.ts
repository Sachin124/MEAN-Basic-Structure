import { Routes } from '@angular/router';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';


// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class EmployeeRoutingModule { }


export const EmployeeRouting: Routes =[
  {
    path:'',
    children:[{
      path:'',
      component:ViewEmployeeComponent
    }]

  }
]