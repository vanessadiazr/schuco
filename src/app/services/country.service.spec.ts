import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CountryService } from './country.service';
import { Country } from '../models/country.model';

describe('CountryService', () => {
  let service: CountryService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,capital,currencies,population,area';

  const mockCountries: Country[] = [
    {
      name: { official: 'Testland' },
      capital: ['Test City'],
      population: 123,
      area: 45,
      currencies: { TST: { name: 'Test Dollar', symbol: 'T$' } }
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CountryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request country data from the API', () => {
    service.getCountries().subscribe((countries) => {
      expect(countries).toEqual(mockCountries);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });
  
  it('should handle error when API fails', () => {
    service.getCountries().subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpTestingController.expectOne(apiUrl);
    req.flush('Error occurred', { status: 500, statusText: 'Server Error' });
  });

});
