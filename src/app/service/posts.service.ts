import {Injectable, signal} from '@angular/core';
import {Post} from '../entity/post';
import {GetRequestHelper} from '../tool/get-request-helper';

@Injectable({providedIn: 'root'})
export class PostsService extends GetRequestHelper {

  /**
   * The currently cached posts.
   */
  public readonly posts = signal<Post[]>([]);

  /**
   * Fetch a list of posts. If there is an error, posts will become an empty array.
   * For pagination, we must still fetch all posts at once so that we know how many total records there are.
   * This also resets the cached comments.
   */
  fetchPosts() {
    this.get<Post>('posts', data => this.posts.set(data));
  }
}
