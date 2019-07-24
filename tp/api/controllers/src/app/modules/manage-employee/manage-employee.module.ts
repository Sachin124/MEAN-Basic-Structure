import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { AddEmployeeComponent } from './employee-view/add-employee/add-employee.component';
import { ManageEmployeeRoutes } from './manage-employee-routing.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatTooltipModule, MatRadioModule,MatIconModule,MatDatepickerModule, MatProgressBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
// import { MatIconModule } from '@angular/material/icon';
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [EmployeeViewComponent, AddEmployeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ManageEmployeeRoutes),
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatRadioModule,
    MatIconModule,
    NgxPaginationModule,
    // ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDcFRNDoFzNe-uJ2VUesHgUAh1KmXg8ppg',
      libraries: ["places"]
    })
  ]
})
export class EmployeeModule { }

