import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NgxsModule } from "@ngxs/store";
import { TodoState } from "./state/todo.state";
 

import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { CustomRouterStateSerializer } from './state/router/router-state.serializer';
import { RouterStateSerializer } from '@ngxs/router-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([TodoState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    CoreModule,
    SharedModule
  ],
  declarations: [AppComponent],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
