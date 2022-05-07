import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryRoomComponent } from './try-room.component';

describe('TryRoomComponent', () => {
  let component: TryRoomComponent;
  let fixture: ComponentFixture<TryRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TryRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TryRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
