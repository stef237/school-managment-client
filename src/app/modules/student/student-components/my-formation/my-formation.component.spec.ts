import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormationComponent } from './my-formation.component';

describe('MyFormationComponent', () => {
  let component: MyFormationComponent;
  let fixture: ComponentFixture<MyFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyFormationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
