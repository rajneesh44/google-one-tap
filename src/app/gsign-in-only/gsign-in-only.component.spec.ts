import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsignInOnlyComponent } from './gsign-in-only.component';

describe('GsignInOnlyComponent', () => {
  let component: GsignInOnlyComponent;
  let fixture: ComponentFixture<GsignInOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GsignInOnlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GsignInOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
