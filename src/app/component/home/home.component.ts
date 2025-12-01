import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {DataService} from '../../service/data.service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatProgressSpinner,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly dataService = inject(DataService);

  readonly posts = this.dataService.posts;
  readonly loading = this.dataService.loading;
  readonly errorMessage = this.dataService.errorMessage;

  fetchPosts() {
    return this.dataService.fetchPosts();
  }
}
