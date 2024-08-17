import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCertificatComponent } from './my-certificat.component';

describe('MyCertificatComponent', () => {
  let component: MyCertificatComponent;
  let fixture: ComponentFixture<MyCertificatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCertificatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyCertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
