import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmlistComponent } from './confirmlist.component';

describe('ConfirmlistComponent', () => {
  let component: ConfirmlistComponent;
  let fixture: ComponentFixture<ConfirmlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
