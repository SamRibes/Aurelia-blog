import { EventAggregator } from 'aurelia-event-aggregator';
import { PostService } from './common/services/post-service';
import { inject } from "aurelia-framework";
import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-framework';
import { AuthService } from "./common/services/auth-service";

@inject(EventAggregator, PostService, AuthService)
export class App {
  router: Router;
  postService: PostService;
  authService: AuthService;
  ea: EventAggregator;
  currentUser: any;
  subscription: any;
  error: Error = new Error('');
  tags: any;
  tags1: any;
  archives: any;
  archives1: any;

  constructor(EventAggregator:EventAggregator, PostService: PostService, AuthService: AuthService) {
    this.ea = EventAggregator;
    this.postService = PostService;
    this.authService = AuthService;
  }

  attached() {

    this.currentUser = this.authService.currentUser;

    if(!this.currentUser == this.authService.currentUser){
      this.subscription = this.ea.subscribe('user', user => {
        this.currentUser = this.authService.currentUser;
      });
    } else {
      this.subscription = this.ea.subscribe('user', user => {
        this.currentUser = this.authService.currentUser;
      });
    }
    
    this.postService.allTags().then(data => {
      this.tags1 = data;
      this.tags = this.tags1.tags;
    }).catch(error => {
      this.error = error.message;
    });

    this.postService.allArchives().then(data => {
      this.archives1 = data;
      this.archives = this.archives1.archives;
    }).catch(error => {
      this.error = error.message;
    });

  }

  detached() {
    this.subscription.dispose();
  }

  logout() {
    this.authService.logout().then(data => {
      console.log('logout attempt');
      this.ea.publish('user', null);
    }).catch(error => {
      this.error = error.message;
    })
  }
  
  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Sam\'s blog';
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'), title: 'All Posts' },
      { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('posts/view'), title: 'View Post' },
      { route: 'archive/:archive', name: 'archive-view', moduleId: PLATFORM.moduleName('posts/archive-view'), title: 'View Posts by Archive' },
      { route: 'tag/:tag', name: 'tag-view', moduleId: PLATFORM.moduleName('posts/tag-view'), title: 'View Posts by Tag' },
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('auth/login'), title: 'Log In' },
      { route: 'signUp', name: 'signUp', moduleId: PLATFORM.moduleName('auth/sign-up'), title: 'Sign Up' },
      { route: 'create-post', name: 'create-post', moduleId: PLATFORM.moduleName('posts/create'), title: 'Create Post' }
    ]);
  }

}
