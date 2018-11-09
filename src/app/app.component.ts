import { Component } from '@angular/core';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project';

  constructor(private ps:PostService){
  }

  users: any = [];
  loginUser: String;
  avatar: String;
  password:String;


  ngOnInit(){
    //this.posts = this.ps.getPosts();
   
    this.ps.getUserData().subscribe(data => {
        this.users = data;
      console.log(this.users[0].username);
      // this.loginUser = this.users[0].username;
      // this.avatar = this.users[0].image;
    });

}

setLogin(username:String,avatar:String){
  this.loginUser = username;
  this.avatar = avatar;
  // location.reload();
}

}