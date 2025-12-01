import {inject, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export abstract class GetRequestHelper {
  private readonly httpClient = inject(HttpClient);

  /**
   * Used by the UI to show whether an http request is currently happening.
   */
  public readonly loading = signal(false);
  /**
   * Used by the UI to show  any HTTP errors. If there are no errors, this returns undefined.
   */
  public readonly errorMessage = signal<string | undefined>(undefined);

  /**
   * Run a GET request against jsonplaceholder. Assume these endpoints always return a JSON array. Caching is disabled; we always want fresh data.
   * @param endpoint the endpoint to call
   * @param callback a callback to supply the data coming back; if there was an error, data will be an empty array
   */
  protected get<T>(endpoint: string, callback: (data: T[]) => void) {
    this.loading.set(true);
    this.errorMessage.set(undefined);
    this.httpClient.get<T[]>(`https://jsonplaceholder.typicode.com/${endpoint}`, {headers: {'Cache-Control': 'no-cache'}}).subscribe({
      next: data => {
        this.loading.set(false);
        this.errorMessage.set(undefined);
        callback(data);
      },
      error: error => {
        this.loading.set(false);
        this.errorMessage.set(error.message);
        callback([]);
      },
    });
  }
}
