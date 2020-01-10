import {
  PostService
} from '../common/services/post-service'
import {
  inject
} from 'aurelia-framework'

@inject(PostService)
export class Index {
  postService: PostService;
  posts: any;
  error: Error = new Error('');

  constructor(PostService: PostService) {
    this.postService = PostService;
  }

  attached() {
    this.postService.allPostPreviews().then(data => {
      var data1: any = data;
      this.posts = data1.posts;
    }).catch(error => {
      this.error = error.message;
    })
  }
}
