import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgForm
} from "@angular/forms";
import {
  PostService
} from '../services/post.service';
import {
  AppComponent
} from '../app.component'
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  constructor(private service: PostService, private app: AppComponent,private http:HttpClient) {}

  user: string;
  avatar: string;

  onAddPost(form: NgForm, user: string) {

    this.user = this.app.getUser()
    this.avatar = this.app.getAvatar();

    this.service.addPost(form.value.title, form.value.description, form.value.image, this.user, this.avatar).subscribe();

    console.log(form.value);
    form.resetForm();

  }

  ngOnInit() {



  }

}