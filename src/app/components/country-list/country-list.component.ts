import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  countries: Country[] = [];
  loading = true;
  error = false;

  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  columns = [
    { key: 'name', label: 'Official country name' },
    { key: 'capital', label: 'Capital' },
    { key: 'currency', label: 'Currency' },
    { key: 'population', label: 'Population' },
    { key: 'area', label: 'Area' },
    { key: 'density', label: 'Population density (inhabitants/km2)' }
  ];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  // Currency formatting
  getCurrency(country: Country): string {
    if (!country.currencies || country.currencies.length === 0) {
      return 'N/A';
    }

    const currency = country.currencies[0];

    return currency.name
      ? `${currency.name}${currency.symbol ? ` (${currency.symbol})` : ''}`
      : 'N/A';
  }

  // Population density calculation
  getDensity(country: Country): number {
    return country.area ? country.population / country.area : 0;
  }

  // Sorting
  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    const isEmpty = (val: any) =>
      val === null || val === undefined || val === '' || val === 'N/A';

    this.countries.sort((a, b) => {
      const valueA = this.getValue(a, column);
      const valueB = this.getValue(b, column);

      // N/A to the end
      if (isEmpty(valueA) && isEmpty(valueB)) return 0;
      if (isEmpty(valueA)) return this.sortDirection === 'asc' ? 1 : -1;
      if (isEmpty(valueB)) return this.sortDirection === 'asc' ? -1 : 1;

      // strings
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB, 'en', { sensitivity: 'base' })
          : valueB.localeCompare(valueA, 'en', { sensitivity: 'base' });
      }

      // numbers
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      }

      return 0;
    });
  }

  // Value extractor
  private getValue(country: Country, column: string): any {
    switch (column) {
      case 'name':
        return country.name?.official || '';

      case 'capital':
        return country.capital?.[0] || '';

      case 'population':
        return country.population;

      case 'area':
        return country.area;

      case 'currency':
        return this.getCurrency(country);

      case 'density':
        return this.getDensity(country);

      default:
        return '';
    }
  }
}
