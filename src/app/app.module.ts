import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { SuiModalService, SuiModalModule } from '@giomamaladze/ng2-semantic-ui';
import { OktaAuth } from '@okta/okta-auth-js';
import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import config from './app.config';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { ProfileComponent } from './profile/profile.component';
import { ConfirmModalComponent, ConfirmModal } from './modal/confirm.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessagesComponent } from './messages/messages.component';



const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ OktaAuthGuard ],
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ OktaAuthGuard ],
  },
   {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [ OktaAuthGuard ],
  }, 
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    ConfirmModalComponent,
    TasksComponent,
    AddTaskComponent,
    TaskItemComponent,
    ButtonComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    OktaAuthModule,
    SuiModalModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [
    { 
      provide: OKTA_CONFIG, 
      useFactory: () => {
        const oktaAuth = new OktaAuth(config.oidc);
        return {
          oktaAuth,
          onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
            const triggerLogin = () => {
              const router = injector.get(Router);
              router.navigate(['/login']);
            };
            if (!oktaAuth.authStateManager.getPreviousAuthState()?.isAuthenticated) {
              triggerLogin();
            } 
/*             else {
              // Ask the user to trigger the login process during token autoRenew process
              const modalService = injector.get(SuiModalService);
              modalService
                .open(new ConfirmModal("Do you want to re-authenticate?", "Auth required", "Yes", "No"))
                .onApprove(triggerLogin)
                .onDeny(() => {});
            } */
          }  
        }
      }
    },
    //{ provide: APP_BASE_HREF, useValue: environment.appBaseHref },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmModalComponent],
})
export class AppModule { }
