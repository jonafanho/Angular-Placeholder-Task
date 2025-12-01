import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../entity/post';

@Injectable({providedIn: 'root'})
export class DataService {
  private readonly httpClient = inject(HttpClient);

  /**
   * Used by the UI to show whether an http request is currently happening.
   */
  public readonly loading = signal(false);
  /**
   * The currently cached posts.
   */
  public readonly posts = signal<Post[]>([]);
  /**
   * Used by the UI to show  any HTTP errors. If there are no errors, this returns undefined.
   */
  public readonly errorMessage = signal<string | undefined>(undefined);

  /**
   * Fetch a list of posts. If there is an error, posts will become an empty array.
   * For pagination, we must still fetch all posts at once so that we know how many total records there are.
   */
  fetchPosts() {
    this.get<Post>('posts', data => this.posts.set(data));
  }

  /**
   * Run a GET request against jsonplaceholder. Assume these endpoints always return a JSON array. Caching is disabled; we always want fresh data.
   * @param endpoint the endpoint to call
   * @param callback a callback to supply the data coming back; if there was an error, data will be an empty array
   */
  private get<T>(endpoint: string, callback: (data: T[]) => void) {
    this.loading.set(true);
    this.httpClient.get<T[]>(`https://jsonplaceholder.typicode.com/${endpoint}`, {headers: {'Cache-Control': 'no-cache'}}).subscribe({
      next: data => {
        callback(data);
        this.loading.set(false);
        this.errorMessage.set(undefined);
      },
      error: errorMessage => {
        callback([]);
        this.loading.set(false);
        this.errorMessage.set(errorMessage);
      },
    });
  }
}
