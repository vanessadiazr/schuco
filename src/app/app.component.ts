import { Component } from '@angular/core';
import { CountryListComponent } from './components/country-list/country-list.component';


@Component({
  selector: 'app-root',
  imports: [CountryListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'countries-app';
}
