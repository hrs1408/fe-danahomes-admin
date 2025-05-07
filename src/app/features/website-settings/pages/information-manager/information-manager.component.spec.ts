import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationManagerComponent } from './information-manager.component';

describe('InformationManagerComponent', () => {
  let component: InformationManagerComponent;
  let fixture: ComponentFixture<InformationManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
