import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GeniusComponent} from './genius.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {DataProvider, LocalStorageDataProvider} from "./services/data-provider.service";
import {testData} from "../json";



describe('GeniusComponent', () => {
  let component: GeniusComponent;
  let fixture: ComponentFixture<GeniusComponent>;
  let dataProvider: LocalStorageDataProvider;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GeniusComponent,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [{provide: DataProvider, useValue: new LocalStorageDataProvider()}],
    }).compileComponents();

    dataProvider = <LocalStorageDataProvider> TestBed.inject(DataProvider);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeniusComponent);
    component = fixture.componentInstance;
  });

  it('should create the GeniusComponent', () => {
    expect(component).toBeTruthy();
  });

  it('HTML blocks <person> and Instance property persons; should be the same amount', () => {
    localStorage.clear()
    localStorage.setItem('json', JSON.stringify(testData));
    dataProvider.reloadData();
    fixture.detectChanges()

    let personsBlocks = fixture.nativeElement.querySelectorAll('person')
    expect(personsBlocks.length).toEqual(testData.personList.length)
  })

});
