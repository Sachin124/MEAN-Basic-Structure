import { Component, OnInit } from "@angular/core";
import PerfectScrollbar from "perfect-scrollbar";

declare const $: any;

//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "dashboard"
  },
  {
    path: "/manage-clients",
    title: "Manage-Clients",
    type: "link",
    icontype: "supervisor_account"
  },
  ,
  {
    path: "/manage-complaints",
    title: "Manage-Service-Request",
    type: "link",
    icontype: "bug_report"
  },
  ,
  {
    path: "/manage-employees",
    title: "Manage-Employees",
    type: "link",
    icontype: "transfer_within_a_station"
  },
  // {
  //   path: "/manage-faq",
  //   title: "Manage-FAQ",
  //   type: "link",
  //   icontype: "question_answer"
  // }, 
  {
    path: '/manage-faq',
    title: 'Manage-FAQ',
    type: 'sub',
    icontype: 'question_answer',
    collapse: 'Manage-FAQ',
    children: [
        { path: 'faq', title: 'FAQ-List', ab: 'F' },

        { path: 'faq-product', title: 'FAQ-Product-List', ab: 'PF' }
    ]
},

  {
    path: "/manage-news",
    title: "Manage-News",
    type: "link",
    icontype: "import_contacts"
  },  
  {
    path: "/manage-shedule",
    title: "Schedule-Task",
    type: "link",
    icontype: "alarm"
  }
];
@Component({
  selector: "app-sidebar-cmp",
  templateUrl: "sidebar.component.html"
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>(
        document.querySelector(".sidebar .sidebar-wrapper")
      );
      let ps = new PerfectScrollbar(elemSidebar, {
        wheelSpeed: 2,
        suppressScrollX: true
      });
    }
  }
  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
      navigator.platform.toUpperCase().indexOf("IPAD") >= 0
    ) {
      bool = true;
    }
    return bool;
  }
}
