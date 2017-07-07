import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpSampleComponent } from './sp-sample.component';

describe('SpSampleComponent', () => {
  let component: SpSampleComponent;
  let fixture: ComponentFixture<SpSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
