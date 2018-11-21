import {
  Component,
  OnInit
} from '@angular/core';
import {
  PostService
} from '../services/post.service';
import {
  Observable
} from 'rxjs';
import {
  Post
} from '../post.model';
import {
  AppComponent
} from '../app.component'
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {


  posts: any = [];
  users: any = [];
  user: string;
  avatar: string;
  userCount: number;
  postCount: number;

  constructor(private ps: PostService, private app: AppComponent) {}


  onDelete(id: string) {
    console.log("Deleting item")
    this.ps.deletePost(id).subscribe();
    location.reload();
    this.ngOnInit();
    //this.refresh();
  }


  ngOnInit() {
    //this.posts = this.ps.getPosts();

    this.ps.getPostsData().subscribe(data => {
      this.posts = data;
      this.postCount = this.posts.length;
      console.log(this.postCount)
    });
    console.log(localStorage.getItem("username"));
    this.user = localStorage.getItem("username");
    this.avatar = localStorage.getItem("avatar");
    this.app.setLogin(this.user,this.avatar);
    
    this.ps.getUserData().subscribe(data =>{
      this.users = data;
      this.userCount = this.users.length;
    });
    
  }

}