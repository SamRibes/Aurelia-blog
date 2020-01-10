import { AuthService } from './../common/services/auth-service';
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from 'aurelia-router';
import { inject } from "aurelia-framework";

@inject(EventAggregator, AuthService, Router)
export class SignUp {
  authService: AuthService;
  name: string;
  error: Error = new Error('');
  router: any;
  ea: EventAggregator;

  constructor(EventAggregator: EventAggregator, AuthService: AuthService, Router: Router) {
    this.ea = EventAggregator;
    this.authService = AuthService;
    this.router = Router;
  }

  attached() {
    document.getElementById("signup_input").focus();
  }
  
  signUp() {
    this.authService.signup(this.name).then(data => {
      var data1: any = data;
      this.ea.publish('user', data1.name);
      console.log(this.authService.currentUser);
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.error = error;
      console.log(this.error.message);
    })
  }
}
