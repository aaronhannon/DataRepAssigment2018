import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  PostService
} from '../services/post.service';
import {
  AppComponent
} from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ps: PostService, private app: AppComponent) {}

  users: any = [];
  loginUser: String;
  avatar: String;
  i: number = 0;

  login(form: NgForm) {

    this.ngOnInit();

    for (this.i = 0; this.i < this.users.length; this.i++) {
      if (form.value.username == this.users[this.i].username && form.value.password == this.users[this.i].password) {

        console.log(this.users[this.i].image);
        this.app.setLogin(form.value.username, this.users[this.i].image);
        localStorage.setItem("username", this.users[this.i].username);
        localStorage.setItem("avatar", this.users[this.i].image);
        localStorage.setItem("loggedIn","true");
        location.reload();
      }
    }
  }

  ngOnInit() {
    this.ps.getUserData().subscribe(data => {
      this.users = data;
      console.log(this.users);
      // this.loginUser = this.users[0].username;
      // this.avatar = this.users[0].image;
    });

  }

}