import {
  Component,
  OnInit
} from '@angular/core';
import {
  PostService
} from '../services/post.service';
import {
  AppComponent
} from '../app.component';

@Component({
  selector: 'app-my-uploads',
  templateUrl: './my-uploads.component.html',
  styleUrls: ['./my-uploads.component.css']
})
export class MyUploadsComponent implements OnInit {

  posts: any = [];
  myPosts: any = [];
  user: string;
  avatar: string;

  constructor(private ps: PostService, private app: AppComponent) {}

  //GETS ID OF POST AND SENDS IT TO THE SERVER TO BE DELETED
  onDelete(id: string) {
    console.log("Deleting item")
    this.ps.deletePost(id).subscribe();
    location.reload();
    this.ngOnInit();
  }

  // ON INIT GETS THE POST DATA AND ONLY DISPLAYS THE POSTS THAT THE LOGGED IN USER CREATED
  ngOnInit() {
    this.ps.getPostsData().subscribe(data => {
      this.posts = data;
      var j = 0;
      for (var index = 0; index < this.posts.length; index++) {
        if (this.posts[index].user == this.user) {
          this.myPosts[j] = this.posts[index];
          j++;
        }
      }
      console.log(this.posts);
      console.log(this.myPosts)
    });
    this.user = localStorage.getItem("username");
    this.avatar = localStorage.getItem("avatar");
    this.app.setLogin(this.user, this.avatar);
  }
}