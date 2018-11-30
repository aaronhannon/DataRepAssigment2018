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
  Router
} from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {


  constructor(private router: Router, private service: PostService, private app: AppComponent, private http: HttpClient) {}

  user: string;
  avatar: string;

  // GRABS FORM DATA AND WHICH USER CREATED IT AND SENDS IT TO THE SERVER
  onAddPost(form: NgForm, user: string) {
    if (form.valid) {
      this.user = this.app.getUser()
      this.avatar = this.app.getAvatar();

      this.service.addPost(form.value.title, form.value.description, form.value.image, this.user, this.avatar).subscribe();
      console.log(form.value);
      form.resetForm();
    } else {
      return;
    }
  }

  ngOnInit() {
  }

}