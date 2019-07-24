import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageFaqsRouts } from './manage-faqs-routing.module';
import { ViewFaqsComponent } from './view-faqs/view-faqs.component';
import { AddFaqsComponent } from './view-faqs/add-faqs/add-faqs.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { ViewProductComponent } from './view-product/view-product.component';
import { AddProductComponent } from './view-product/add-product/add-product.component';
import { NgxPaginationModule } from 'ngx-pagination';

const config: InputFileConfig = {};

@NgModule({
  declarations: [ViewFaqsComponent, AddFaqsComponent, ViewProductComponent, AddProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ManageFaqsRouts),
    FormsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    NgxPaginationModule,
    InputFileModule.forRoot(config),
    MatTooltipModule
  ]
})
export class ManageFaqsModule { }
