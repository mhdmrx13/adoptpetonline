import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptPetComponent } from './adopt-pet.component';

describe('AdoptPetComponent', () => {
  let component: AdoptPetComponent;
  let fixture: ComponentFixture<AdoptPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdoptPetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdoptPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
