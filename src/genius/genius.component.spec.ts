import {TestBed} from '@angular/core/testing';
import {GeniusComponent} from './genius.component';
import {AppRoutingModule} from "./genius-routing.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {DataProvider, LocalStorageDataProvider} from "./services/data-provider.service";


describe('GeniusComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GeniusComponent,
      ],
      imports: [
        AppRoutingModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [{ provide: DataProvider, useValue: new LocalStorageDataProvider() }],
    }).compileComponents();
  });


  it('should create the GeniusComponent', () => {
    const fixture = TestBed.createComponent(GeniusComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'untitled12'`, () => {
  //   const fixture = TestBed.createComponent(GeniusComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('untitled12');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(GeniusComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('untitled12 app is running!');
  // });
});
