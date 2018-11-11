import {
  Component
} from '@angular/core';
import {
  PostService
} from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project';
  showFiller = false;

  constructor(private ps: PostService) {}

  users: any = [];
  loginUser: string;
  avatar: string;
  password: String;


  ngOnInit() {
    //this.posts = this.ps.getPosts();

    this.ps.getUserData().subscribe(data => {
      this.users = data;
      console.log(this.users[0].username);
      // this.loginUser = this.users[0].username;
      // this.avatar = this.users[0].image;
    });

  }

  setLogin(username: string, avatar: string) {
    this.loginUser = username;
    this.avatar = avatar;
    // location.reload();
  }

  getUser() {
    return this.loginUser
    // location.reload();
  }

  getAvatar() {
    return this.avatar;
  }

}