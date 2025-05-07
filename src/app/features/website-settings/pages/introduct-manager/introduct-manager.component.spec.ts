import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductManagerComponent } from './introduct-manager.component';

describe('IntroductManagerComponent', () => {
  let component: IntroductManagerComponent;
  let fixture: ComponentFixture<IntroductManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntroductManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroductManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
