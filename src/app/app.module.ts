import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {MatSelectInfiniteScrollModule} from 'ng-mat-select-infinite-scroll';

import { RoomComponent } from './room/room.component';
import { RoomService } from './shared/room/room.service';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user/user.service';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ChatService } from './shared/chat.service';
import { MessagesService } from './shared/messages.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'create-room', component: RoomComponent },
  { path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ] 
  }
]

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    HomeComponent,
    UserComponent,
    RegistrationComponent,
    HeaderComponent,
    SidenavListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
    InfiniteScrollModule,
    MatSelectInfiniteScrollModule,
    ToastrModule.forRoot({
      progressBar : true
    }
    ),
    RouterModule.forRoot(routes)
  ],
  providers: [RoomService, ChatService, MessagesService, [UserService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]],  
  bootstrap: [AppComponent],
  entryComponents: [RoomComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);