import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PostComponent} from './post.component';

describe('Post', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    fixture.componentRef.setInput('post', {
      id: 1,
      title: 'Test Post',
      body: 'Test',
    });
    fixture.detectChanges();
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have post title set', async () => {
    expect(component.post.title).toEqual('Test Post');
  });
});
