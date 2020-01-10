import {
  inject
} from 'aurelia-framework'
import {
  PostService
} from '../common/services/post-service'

@inject(PostService)
export class ArchiveView {
  postService: PostService;
  posts: any;
  error: Error = new Error('');
  archive: string;

  constructor(PostService: PostService) {
    this.postService = PostService;
  }

  activate(params) {
    this.archive = params.archive;
    this.postService.postsByArchive(this.archive).then(data => {
      var data1: any = data;
      this.posts = data1.posts;
    }).catch(error => {
      this.error = error.message;
    })

  }
}
