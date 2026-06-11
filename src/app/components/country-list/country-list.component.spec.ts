import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CountryListComponent } from './country-list.component';
import { Country } from '../../models/country.model';

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let httpTestingController: HttpTestingController;

  const mockCountries: Country[] = [
    {
      name: { official: 'Brazil' },
      capital: ['Brasília'],
      population: 200,
      area: 100,
      currencies: [{ code: 'BRL', name: 'Real', symbol: 'R$' }]
    },
    {
      name: { official: 'Chile' },
      population: 50,
      area: 25
    },
    {
      name: { official: 'Argentina' },
      capital: ['Buenos Aires'],
      population: 100,
      area: 50,
      currencies: [{ code: 'ARS', name: 'Peso', symbol: '$' }]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryListComponent, HttpClientTestingModule]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    const req = httpTestingController.expectOne('http://localhost:3000/api/countries');
    expect(req.request.method).toBe('GET');
    req.flush([...mockCountries]);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return N/A when currencies are missing', () => {
    expect(component.getCurrency(mockCountries[1])).toBe('N/A');
  });

  it('should return formatted currency when available', () => {
    expect(component.getCurrency(mockCountries[2])).toBe('Peso ($)');
  });

  it('should calculate density correctly', () => {
    const density = component.getDensity(mockCountries[2]);
    expect(density).toBeCloseTo(2);
  });

  it('should sort by population ascending', () => {
    component.sortData('population');
    expect(component.countries.map(c => c.name.official)).toEqual(['Chile', 'Argentina', 'Brazil']);
  });

  it('should place empty values at the end when sorting', () => {
    component.sortData('capital');

    const capitals = component.countries.map(c => c.capital?.[0] || '');
    expect(capitals[capitals.length - 1]).toBe('');
  });

  it('should toggle sort direction when sorting the same column twice', () => {
    component.sortData('population');
    expect(component.sortDirection).toBe('asc');

    component.sortData('population');
    expect(component.sortDirection).toBe('desc');
    expect(component.countries.map(c => c.name.official)).toEqual(['Brazil', 'Argentina', 'Chile']);
  });
});
