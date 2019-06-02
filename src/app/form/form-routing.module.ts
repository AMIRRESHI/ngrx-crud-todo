
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component:  FormComponent,
    canActivate: [CanActivateGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActivateGuard, CanDeactivateGuard]
})
export class FormRoutingModule {
  static components = [ FormComponent  ];
}
