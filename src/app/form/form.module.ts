

import { NgModule } from '@angular/core';


import { SharedModule } from '../shared/shared.module';
import { FormRoutingModule } from './form-routing.module';

 

@NgModule({
  imports: [ FormRoutingModule, SharedModule],
  declarations: [ FormRoutingModule.components]
})
 

export class FormModule {
}
 