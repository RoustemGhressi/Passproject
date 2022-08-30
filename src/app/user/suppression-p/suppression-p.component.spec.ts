import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionPComponent } from './suppression-p.component';

describe('SuppressionPComponent', () => {
  let component: SuppressionPComponent;
  let fixture: ComponentFixture<SuppressionPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppressionPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppressionPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
