import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsSchemeComponent } from './colors-scheme.component';

describe('ColorsSchemeComponent', () => {
  let component: ColorsSchemeComponent;
  let fixture: ComponentFixture<ColorsSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorsSchemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorsSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
