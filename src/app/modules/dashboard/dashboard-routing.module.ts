import {
  Routes
} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';


// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class DashboardRoutingModule { }


export const DashboardRouting: Routes = [{
  path: '',
  component:DashboardComponent
}]