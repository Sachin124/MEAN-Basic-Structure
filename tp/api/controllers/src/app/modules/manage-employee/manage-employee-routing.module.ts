import { Routes } from "@angular/router";
import { EmployeeViewComponent } from "./employee-view/employee-view.component";
import { AddEmployeeComponent } from "./employee-view/add-employee/add-employee.component";

export const ManageEmployeeRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: EmployeeViewComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "add-new",
        component: AddEmployeeComponent
      }
    ]
  }
];
