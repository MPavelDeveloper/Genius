import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GeniusComponent} from './genius.component';
import {AppRoutingModule} from "./genius-routing.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {DataProvider, LocalStorageDataProvider} from "./services/data-provider.service";
import {Person, Sex} from "../model/person";
import {Events} from "../model/life-event";



describe('GeniusComponent', () => {
  let app: GeniusComponent;
  let fixture: ComponentFixture<GeniusComponent>;

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
      providers: [{provide: DataProvider, useValue: new LocalStorageDataProvider()}],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeniusComponent);
    app = fixture.componentInstance;
    app.persons = [{
      // first family
      // father
      id: '2p',
      firstName: 'Tom',
      lastName: 'James',
      middleName: 'Nickson',
      age: 54,
      sex: Sex.Male,
      lifeEvent: [
        {
          date: new Date('1989-03-12'),
          type: Events.wedding,
          description: 'Married',
        },
      ],
      familyId: '2f',
    }];
    fixture.detectChanges();
  });


  it('should create the GeniusComponent', () => {
    expect(app).toBeTruthy();
  });

  it('The component displays the person ', () => {
    for(let person of app.persons) {
      expect(person instanceof Person).toBeTrue()
    }
  })

});
