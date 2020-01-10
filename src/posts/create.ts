import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PostService } from './../common/services/post-service';

@autoinject
export class Create {
  message: string;
  postService: PostService;
  error: Error = new Error('');
  post: any;
  router: Router ;
  allTags: any;

  constructor(Router:Router, PostService: PostService) {
    this.router = Router;
    this.postService = PostService;
  }

  attached() {

    this.post = {
      title: '',
      body: '',
      tags: []
    }

    this.postService.allTags().then(data => {
      var tags1:any = data;
     this.allTags = tags1.tags;
     console.log(this.allTags);
   }).catch(error => {
     this.error = error.message;
   });
  }

  createPost(){    
    this.postService.create(this.post).then(data => {
      var data1:any = data;
      this.router.navigateToRoute('post-view', {slug: data1.slug });
    }).catch(error => {
      console.log(error.message);
      
    })
  }

}
