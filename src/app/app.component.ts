import {
  Component, ChangeDetectorRef
} from '@angular/core';
import {
  PostService
} from './services/post.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project';
  showFiller = false;

  constructor(private ps: PostService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  users: any = [];
  loginUser: string;
  avatar: string;
  password: String;


  ngOnInit() {
    //this.posts = this.ps.getPosts();

    this.ps.getUserData().subscribe(data => {
      this.users = data;
      // this.loginUser = this.users[0].username;
      // this.avatar = this.users[0].image;
    });

  }

  setLogin(username: string, avatar: string) {
    this.loginUser = username;
    this.avatar = avatar;
    // location.reload();
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