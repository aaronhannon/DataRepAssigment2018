import {
  Injectable,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  Post
} from '../post.model';
import {
  User
} from '../user.model';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}

  getPostsData(): Observable < any > {
    return this.http.get("http://localhost:8081/api/posts");
  }

  getUserData(): Observable < any > {
    // console.log(this.http.get("http://localhost:8081/api/users"));
    return this.http.get("http://localhost:8081/api/users");

  }

  private posts: Post[] = [];
  private users: User[] = [];
  //private postsUpdated = new Subject<Post[]>();
  // private user: String = "admin";


  getPosts() {
    return [...this.posts];
  }

  getUsers() {
    return [...this.users];
  }

  deletePost(id: string): Observable < any > {
    return this.http.delete("http://localhost:8081/api/posts/" + id);
  }

  addUser(username: string, password: string, image: string): Observable < any > {
    const user: User = {
      username: username,
      password: password,
      image: image
    };
    return this.http.post("http://localhost:8081/api/users", user);
  }

  addPost(title: string, description: string, image: string, user: string, avatar: string): Observable < any > {
    const post: Post = {
      title: title,
      description: description,
      image: image,
      user: user,
      avatar: avatar,
    };
    return this.http.post("http://localhost:8081/api/posts", post);
  }

  getPost(id: string): Observable < any > {
    console.log("id:"+ id);
    return this.http.get("http://localhost:8081/api/posts/" + id);
  }

  updatePost(id: string, title: string, description: string,image:string, user:string,avatar:string): Observable < any > {
    const post: Post = {
      title: title,
      description: description,
      image:image,
      user:user,
      avatar:avatar
    };
    return this.http.put("http://localhost:8081/api/posts/" + id, post);
  }

}