import {
  inject
} from 'aurelia-framework'
import {
  PostService
} from '../common/services/post-service'

@inject(PostService)
export class TagView {
  postService: PostService;
  posts: any;
  error: Error = new Error('');
  tag: string;

  constructor(PostService: PostService) {
    this.postService = PostService;
  }

  activate(params) {
    this.tag = params.tag;
    this.postService.postsByTag(this.tag).then(data => {
      var data1: any = data;
      this.posts = data1.posts;
    }).catch(error => {
      this.error = error.message;
    })

  }
}
