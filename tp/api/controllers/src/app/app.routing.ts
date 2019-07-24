import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth/auth-layout.component";
import { AuthGuard } from "./public service/auth-guard.service";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: "./dashboard/dashboard.module#DashboardModule",
        canActivate: [AuthGuard]
      },
      {
        path: "manage-clients",
        loadChildren:
          "./modules/manage-client/manage-client.module#ClientModule",
        canActivate: [AuthGuard]
      },
      {
        path: "manage-employees",
        loadChildren:
          "./modules/manage-employee/manage-employee.module#EmployeeModule",
        canActivate: [AuthGuard]
      },
      {
        path: "manage-faq",
        loadChildren:
          "./modules/manage-faqs/manage-faqs.module#ManageFaqsModule",
        canActivate: [AuthGuard]
      },
      {
        path: "manage-news",
        loadChildren:
          "./modules/manage-news/manage-news.module#ManageNewsModule",
        canActivate: [AuthGuard]
      },
      {
        path: "manage-complaints",
        loadChildren:
          "./modules/manage-complaints/manage-complaints.module#ManageComplaintsModule",
        canActivate: [AuthGuard]
      },
      {
        path: "manage-shedule",
        loadChildren:
          "./modules/shedule-complaint/shedule-complaint.module#SheduleComplaintModule",
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: "./login/pages.module#PagesModule"
      }
    ]
  }
];
