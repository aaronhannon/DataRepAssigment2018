import {
  Component,
  ChangeDetectorRef
} from '@angular/core';
import {
  PostService
} from './services/post.service';
import {
  MediaMatcher
} from '@angular/cdk/layout';
import {
  Router
} from '@angular/router';
import {
  Title
} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project';
  showFiller = false;

  constructor(private router: Router, private ps: PostService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private titleService: Title) {
    //Side Nav
    this.mobileQuery = media.matchMedia('(max-width: 600px)');

  }

  //Variables
  users: any = [];
  loginUser: string = "Guest";
  avatar: string;
  password: String;
  loggedIn: string;

  //Sets Tab Title
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  //Sets initial state of localstorage to save who is logged in
  ngOnInit() {

    this.loggedIn = localStorage.getItem("loggedIn");
    if (localStorage.getItem("loggedIn") == null) {
      localStorage.setItem("loggedIn", "false");
      location.reload();
      this.router.navigate(['/list']);
    } else if (localStorage.getItem("loggedIn") == "true") {
      localStorage.setItem("loggedIn", "true");
    } else if (localStorage.getItem("loggedIn") == "false") {
      localStorage.setItem("loggedIn", "false");
    }

    //Gets user data
    this.ps.getUserData().subscribe(data => {
      this.users = data;
    });
    this.setTitle("PIC_POSTER");
    this.router.navigate(['/list']);
  }

  setLogin(username: string, avatar: string) {
    this.loginUser = username;
    this.avatar = avatar;
  }

  //Resets state of login
  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    localStorage.setItem("loggedIn", "false");
    this.loginUser = "Guest";
    this.avatar = "";
    this.router.navigate(['/list']);
    location.reload();
  }

  //Getters and setters
  getUser() {
    return this.loginUser
  }

  getAvatar() {
    return this.avatar;
  }

  //Sidenav mobile
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}