import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZyEditableTableComponent } from './zy-editable-table.component';

describe('ZyEditableTableComponent', () => {
  let component: ZyEditableTableComponent;
  let fixture: ComponentFixture<ZyEditableTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZyEditableTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZyEditableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
