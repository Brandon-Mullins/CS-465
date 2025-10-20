import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TripService, Trip } from '../../services/trip.service';

@Component({
  selector: 'app-trips-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trips-list.component.html'
})
export class TripsListComponent {
  private tripsApi = inject(TripService);
  trips: Trip[] = [];

  ngOnInit() {
    this.tripsApi.list().subscribe(t => (this.trips = t));
  }
}
