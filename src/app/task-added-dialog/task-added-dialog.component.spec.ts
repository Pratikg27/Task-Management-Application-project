import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddedDialogComponent } from './task-added-dialog.component';

describe('TaskAddedDialogComponent', () => {
  let component: TaskAddedDialogComponent;
  let fixture: ComponentFixture<TaskAddedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskAddedDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAddedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
