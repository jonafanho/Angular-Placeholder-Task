import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {PostComponent} from '../post/post.component';
import {PostsService} from '../../service/posts.service';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatProgressSpinner,
    MatPaginatorModule,
    PostComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly postsService = inject(PostsService);
  readonly posts = this.postsService.posts;
  readonly loading = this.postsService.loading;
  readonly errorMessage = this.postsService.errorMessage;

  fetchPosts() {
    return this.postsService.fetchPosts();
  }

  /**
   * Get a subset of all posts based on the paginator state
   * @param paginator the paginator object
   */
  postSubset(paginator: MatPaginator) {
    if (this.posts().length === 0) {
      return [];
    } else {
      const startIndex = Math.min(this.posts().length, paginator.pageIndex * paginator.pageSize);
      const endIndex = Math.min(this.posts().length, startIndex + paginator.pageSize);
      return this.posts().slice(startIndex, endIndex);
    }
  }
}
