import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShirtPageComponent } from './shirt-page.component';

describe('ShirtPageComponent', () => {
  let component: ShirtPageComponent;
  let fixture: ComponentFixture<ShirtPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShirtPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShirtPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
