import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent, SpSampleComponent } from './components';
import { RouterModule } from '@angular/router';

import { AzureGuardGuard } from './azure-guard.guard';
import { AdalService, provideAdalService } from './services/adal-service.service';
//import * as adal from 'adal';

const adalConfig: any = {
  clientId: '5fe6add4-58e3-4570-ab08-471d8fbc2414',
  tenant: 'dafa1a65-572c-408f-8634-37525d38da68'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpSampleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AzureGuardGuard]
      },
      {
        path: 'sample',
        component: SpSampleComponent,
        canActivate: [AzureGuardGuard]
      }
    ])
  ],
  providers: [
    AzureGuardGuard,
    {
      provide: AdalService,
      useFactory: () => new AdalService(adalConfig)
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
