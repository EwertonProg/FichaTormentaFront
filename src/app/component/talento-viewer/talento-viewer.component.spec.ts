import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentoViewerComponent } from './talento-viewer.component';

describe('TalentoViewerComponent', () => {
  let component: TalentoViewerComponent;
  let fixture: ComponentFixture<TalentoViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentoViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
