import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { CancellistComponent } from './cancellist/cancellist.component';
import { ConfirmlistComponent } from './confirmlist/confirmlist.component';
import { LayoutComponent } from './layout.component';
import { ProductdetailsComponent } from './Shop Application/productdetails/productdetails.component';
import { ProductgroupComponent } from './Shop Application/productgroup/productgroup.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'Addstudent', pathMatch: 'full' },
      { path: 'Addstudent', component: AddstudentComponent },
      { path: 'studentdetails', component: StudentDetailsComponent },
      { path: 'viewdetails', component: ViewdetailsComponent },
      { path: 'confirmlist', component: ConfirmlistComponent },
      { path: 'cancellist', component: CancellistComponent },
      { path: 'productgroup', component: ProductgroupComponent },
      { path: 'productdetails', component: ProductdetailsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
