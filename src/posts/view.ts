import { PostService } from './../common/services/post-service';
import { inject } from 'aurelia-framework'

@inject(PostService)
export class View {
  
  postService: PostService;
  post: any;
  error: Error = new Error('');

  constructor(PostService: PostService) {
    this.postService = PostService;
  }

  activate(params: { slug: string; }) {
    this.postService.find(params.slug).then(data => {
      var data1: any = data;
      this.post = data1.post;
    }).catch(error => {
      this.error = error.message;
    })
  }
}
