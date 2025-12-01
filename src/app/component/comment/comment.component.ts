import {Component, Input} from '@angular/core';
import {Comment} from '../../entity/comment';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-comment',
  imports: [
    MatCardModule,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input({required: true}) comment!: Comment;
}
