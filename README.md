# Angular Placeholder Task

This project fetches a list of posts and comments from [JSONPlaceholder](https://jsonplaceholder.typicode.com). It includes a paginator and asynchronous GET requests.

All posts are fetched using a button. This is to ensure that the paginator knows how many posts there are in total to properly display the number of pages available.

Comments are fetched by clicking a button on each post. This design decision was made in case there are a lot of comments per post, it will be quite inefficient to fetch all comments on all posts at once. A lot of social media sites only load all comments when the user clicks on the comments button to avoid too much overhead.

## Project Structure

The HTML entry point is in `app.html`. This is simply a wrapper for the rest of the application, containing a padding around the outer edges.

The project uses [Angular Material](https://material.angular.dev/) to avoid recreating common UI elements.

### Components

Components are in the `component` folder.

* The `home` component contains the title and the button to fetch the posts. The paginator and results are also displayed here.
* The `post` and `comment` components render each post and comment respectively.

### Entities

Entities are in the `entity` folder. These determine the schema for the data from the endpoints.

Note that each post contains additional fields, `comments` (an array of `Comment`s) and `commentsLoaded` (boolean).

### Services

There is only one service in this project, `service/posts.service.ts`. This manages a global list of posts fetched from the endpoint. When the user clicks on the fetch post button, this service is used to fetch the posts and persist it.

When fetching comments, an ad-hoc service is used to fetch comments per post (in `post.component.ts`). This design decision was made because comments are not separately persisted; they are injected to the existing post object. This makes managing comments easier.

Both the post and comment services extend `tool/get-request-helper.ts`, which contains useful signals for showing the loading state (for progress spinners) and any error messages from the HTTP request.

## Code Quality

Simple unit tests are present for each component. [Angular ESLint](https://www.npmjs.com/package/@angular-eslint/eslint-plugin) has also been installed.

## Git Structure

Development (except for the initial file setup) is done on the [`dev` branch](https://github.com/jonafanho/Angular-Placeholder-Task/tree/dev) to avoid committing directly to master. When a feature is complete, a pull request should be made to merge code to master.

The repository is set up to enforce signed commits on all branches.

Each time something is committed, a [GitHub Actions](https://github.com/jonafanho/Angular-Placeholder-Task/actions) pipeline will run. This will run the unit tests and the linter to ensure code quality, then build the project. The built files are exported to a ZIP artifact which can be downloaded directly from GitHub for each run.
