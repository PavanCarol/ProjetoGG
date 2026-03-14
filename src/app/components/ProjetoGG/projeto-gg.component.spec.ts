import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoGGComponent } from './projeto-gg.component';

describe('ProjetoGGComponent', () => {
  let component: ProjetoGGComponent;
  let fixture: ComponentFixture<ProjetoGGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetoGGComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetoGGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
