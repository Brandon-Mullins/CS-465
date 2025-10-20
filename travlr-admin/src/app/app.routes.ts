import { Routes } from '@angular/router';
import { TripsListComponent } from './components/trips-list/trips-list.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripsListComponent },
  { path: 'trip/new', component: TripFormComponent },
  { path: 'trip/:id', component: TripFormComponent }
];
