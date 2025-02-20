import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiReservaComponent } from './confi-reserva.component';

describe('ConfiReservaComponent', () => {
  let component: ConfiReservaComponent;
  let fixture: ComponentFixture<ConfiReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiReservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
