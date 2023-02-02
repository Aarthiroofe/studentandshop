import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';
import { ConfirmlistComponent } from './confirmlist/confirmlist.component';
import { CancellistComponent } from './cancellist/cancellist.component';
import { WebcamModule } from 'ngx-webcam';
import { ProductdetailsComponent } from './Shop Application/productdetails/productdetails.component';
import { ProductgroupComponent } from './Shop Application/productgroup/productgroup.component';
@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AddstudentComponent,
    StudentDetailsComponent,
    ViewdetailsComponent,
    ConfirmlistComponent,
    CancellistComponent,
    ProductdetailsComponent,
    ProductgroupComponent,

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    WebcamModule

  ]
})
export class LayoutModule { }
