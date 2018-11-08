import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  
    getPostsData(): Observable<any> {
      return this.http.get("http://localhost:8081/api/posts");
    }

  private posts: Post[] = [];
  //private postsUpdated = new Subject<Post[]>();
  // private user: String = "admin";


  getPosts() {
    return [...this.posts];
  }

  deletePost(id: string):Observable<any>{
    return this.http.delete("http://localhost:8081/api/posts/"+id);
    }

  addPost(title: string, description: string,image: string,user:string): Observable<any> {
    const post: Post = {title: title, description: description,image: image,user:user};
    return this.http.post("http://localhost:8081/api/posts",post);
  }

}
