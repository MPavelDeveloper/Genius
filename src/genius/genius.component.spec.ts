import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GeniusComponent} from './genius.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('GeniusComponent', () => {
  let component: GeniusComponent;
  let fixture: ComponentFixture<GeniusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [GeniusComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeniusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the GeniusComponent', () => {
    expect(component).toBeTruthy();
  });

});
