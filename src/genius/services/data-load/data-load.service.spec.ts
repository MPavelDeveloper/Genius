import {DataLoadService} from './data-load.service';

describe('DataLoadService', () => {

  let service: DataLoadService;

  beforeEach(() => {
   service = new DataLoadService();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
