import {
  Component, ChangeDetectorRef
} from '@angular/core';
import {
  PostService
} from './services/post.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project';
  showFiller = false;

  constructor(private router: Router,private ps: PostService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private titleService: Title) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');

  }

  users: any = [];
  loginUser: string = "Guest";
  avatar: string;
  password: String;
  loggedIn: string;

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    //this.posts = this.ps.getPosts();

    this.loggedIn = localStorage.getItem("loggedIn");
    if(localStorage.getItem("loggedIn") == null){
      localStorage.setItem("loggedIn","false");
      location.reload();
    }else if(localStorage.getItem("loggedIn") == "true"){
      localStorage.setItem("loggedIn","true");
    }else if(localStorage.getItem("loggedIn") == "false"){
      localStorage.setItem("loggedIn","false");
    }
    
    this.ps.getUserData().subscribe(data => {
      this.users = data;
      // this.loginUser = this.users[0].username;
      // this.avatar = this.users[0].image;
    });
    this.setTitle("PIC_POSTER");
  }

  setLogin(username: string, avatar: string) {
    this.loginUser = username;
    this.avatar = avatar;
    // location.reload();
  }

  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    localStorage.setItem("loggedIn","false");
    this.loginUser = "Guest";
    this.avatar = "";
    this.router.navigate(['/list']);
    location.reload();
  }

  getUser() {
    return this.loginUser
    // location.reload();
  }

  getAvatar() {
    return this.avatar;
  }

  mobileQuery: MediaQueryList;


  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}