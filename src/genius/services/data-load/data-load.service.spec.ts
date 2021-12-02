import {DataLoadService} from './data-load.service';

describe('DataLoadService', () => {
  let service: DataLoadService;
  class ServiceMock {
    public subscribeChangeFamilies: Boolean;
    public subscribeChangePersons: Boolean;

    subscribe() {
      service.persons$.subscribe(() => {this.setSubscribeFlagPersons()});
      service.families$.subscribe(() => {this.setSubscribeFlagFamilies()})
    }

    setSubscribeFlagFamilies(): void {
      this.subscribeChangeFamilies = true;
    }

    setSubscribeFlagPersons(): void {
      this.subscribeChangePersons = true;
    }
  }

  beforeEach(() => {
   service = new DataLoadService();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be true; check subscribes', ()=>{
    let serviceMock = new ServiceMock();
    serviceMock.subscribe();
    service.reloadPersons(true);
    service.reloadFamilies(true);

    expect(serviceMock.subscribeChangePersons).toBeTrue();
    expect(serviceMock.subscribeChangeFamilies).toBeTrue();
  });
});
