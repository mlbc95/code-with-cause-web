import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientManagementComponent } from './recipient-management.component';

describe('RecipientManagementComponent', () => {
  let component: RecipientManagementComponent;
  let fixture: ComponentFixture<RecipientManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
