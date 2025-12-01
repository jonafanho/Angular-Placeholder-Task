import {Component, Input} from '@angular/core';
import {Post} from '../../entity/post';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {GetRequestHelper} from '../../tool/get-request-helper';
import {CommentComponent} from '../comment/comment.component';
import {Comment} from '../../entity/comment';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-post',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    CommentComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input({required: true}) post!: Post;
  private readonly commentsService = new CommentsGetHelper();
  readonly loading = this.commentsService.loading;
  readonly errorMessage = this.commentsService.errorMessage;

  fetchComments() {
    this.commentsService.fetchComments(this.post);
  }
}

/**
 * This is an ad-hoc service to fetch comments. Since the data isn't globally persisted (comments are written to the post object), we don't have to make a dedicated service for it. We only need it once per post.
 */
class CommentsGetHelper extends GetRequestHelper {

  /**
   * Fetch a list of comments for the specified post. The comments will be populated into the Post object directly.
   * @param post the post to fetch comments for
   */
  fetchComments(post: Post) {
    this.get<Comment>(`comments?postId=${post.id}`, data => {
      post.comments = data;
      post.commentsFetched = this.errorMessage() === undefined;
    });
  }
}
