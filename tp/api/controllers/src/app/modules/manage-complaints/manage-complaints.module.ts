import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageComplaintsRouting } from './manage-complaints-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComplaintsViewComponent } from './complaints-view/complaints-view.component';
import { AddComplaintsComponent } from './complaints-view/add-complaints/add-complaints.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ViewDetailsComponent } from './complaints-view/view-details/view-details.component';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [ComplaintsViewComponent, AddComplaintsComponent, ViewDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ManageComplaintsRouting),
    FormsModule,
    ModalModule.forRoot(),
    MatProgressBarModule,
    MatTooltipModule,
    MatButtonModule,
    MatMomentDateModule,
    MatSelectModule,
    MatDatepickerModule,
    NgxPaginationModule,
    MatInputModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class ManageComplaintsModule { }
