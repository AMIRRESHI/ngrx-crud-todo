
import { NgModule } from '@angular/core';


import { ListRoutingModule } from './list-routing.module';
import { SharedModule } from '../shared/shared.module';

 

@NgModule({
  imports: [ListRoutingModule, SharedModule],
  declarations: [ListRoutingModule.components]
})
 

export class ListModule {
}

 