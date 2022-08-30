import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwofactorComponent } from './twofactor.component';

describe('TwofactorComponent', () => {
  let component: TwofactorComponent;
  let fixture: ComponentFixture<TwofactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwofactorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwofactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
