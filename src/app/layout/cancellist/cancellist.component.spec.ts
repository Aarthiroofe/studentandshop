import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellistComponent } from './cancellist.component';

describe('CancellistComponent', () => {
  let component: CancellistComponent;
  let fixture: ComponentFixture<CancellistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancellistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancellistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
