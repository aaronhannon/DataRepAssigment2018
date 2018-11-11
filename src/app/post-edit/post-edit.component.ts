import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  PostService
} from '../services/post.service';
import {
  NgForm
} from "@angular/forms";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private ps: PostService) {}
  
  post: any = [];

  ngOnInit() {
    console.log("Id2: "+ this.route.snapshot.params['_id']);
    this.ps.getPost(this.route.snapshot.params['_id']).subscribe(data => {
      this.post = data;
      console.log("posts: "+this.post);
    })
  }

  onEditPost(form: NgForm) {
    this.ps.updatePost(this.post[0]._id, form.value.title, form.value.description,this.post[0].image,this.post[0].user,this.post[0].avatar).subscribe();
    this.router.navigate(['/list']);
    console.log("here");
  }
  
}