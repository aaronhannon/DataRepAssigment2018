import {
  Component,
  OnInit
} from '@angular/core';
import {
  PostService
} from '../services/post.service';
import {
  NgForm
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  constructor(private router: Router,private service: PostService) {}

  addUser(form: NgForm) {

    this.service.addUser(form.value.username, form.value.password, form.value.uimage).subscribe();

    console.log(form.value);
    form.resetForm();
    this.router.navigate(['/login']);

  }

  ngOnInit() {}

}