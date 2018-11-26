import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  AppComponent
} from './app.component';
import {
  PostDetailsComponent
} from './post-details/post-details.component';
import {
  PostService
} from './services/post.service';
import {
  HttpClientModule
} from '@angular/common/http';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  FormsModule
} from "@angular/forms";
import {
  AvatarModule
} from 'ngx-avatar';
// import {NgForm, FormBuilder,FormGroup} from "@angular/forms";
import {
  MatInputModule,
  MatMenuModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatExpansionModule,
  MatGridListModule,
  MatSidenavModule,
  MatListModule,
  MatSnackBarModule
} from '@angular/material';
import {
  PostCreateComponent
} from './post-create/post-create.component';
import {
  UserCreateComponent
} from './user-create/user-create.component';
import {
  LoginComponent
} from './login/login.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { MyUploadsComponent } from './my-uploads/my-uploads.component';

const appRoutes: Routes = [{
    path: 'list',
    component: PostDetailsComponent
  },
  {
    path: 'create',
    component: PostCreateComponent
  },
  {
    path: 'user',
    component: UserCreateComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'edit/:_id',
    component: PostEditComponent
  },
  {
    path: 'myUploads',
    component: MyUploadsComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    PostDetailsComponent,
    PostCreateComponent,
    UserCreateComponent,
    LoginComponent,
    PostEditComponent,
    MyUploadsComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    AvatarModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule {}