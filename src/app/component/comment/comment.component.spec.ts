import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CommentComponent} from './comment.component';

describe('Comment', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    fixture.componentRef.setInput('comment', {
      name: 'Test Name',
      email: 'test@test.com',
      body: 'Test',
    });
    fixture.detectChanges();
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have comment name set', async () => {
    expect(component.comment.name).toEqual('Test Name');
  });
});
