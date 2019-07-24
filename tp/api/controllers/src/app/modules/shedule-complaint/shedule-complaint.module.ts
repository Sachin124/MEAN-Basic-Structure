import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SheduleComplaintRoutes } from './shedule-complaint-routing.module';
import { ViewSheduleComponent } from './view-shedule/view-shedule.component';
import { AddSheduleComponent } from './view-shedule/add-shedule/add-shedule.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatInputModule,  MatProgressBarModule, MatTooltipModule, MatIconModule,MatSelectModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
@NgModule({
  declarations: [ViewSheduleComponent, AddSheduleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SheduleComplaintRoutes),
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSelectModule,
    NgxPaginationModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatIconModule,
    NgxUiLoaderModule
  ]
})
export class SheduleComplaintModule { }
