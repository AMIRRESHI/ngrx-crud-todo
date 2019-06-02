import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';

const app_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/list' },
  { path: 'list', loadChildren: 'src/app/list/list.module#ListModule' },
  { path: 'list/:id', loadChildren: 'src/app/form/form.module#FormModule' },
  //{ path: '**', pathMatch: 'full', redirectTo: '/list'} // catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
