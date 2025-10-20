import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripService } from '../services/trip.service';
import { Trip } from '../models/trip.model';
import { TripCardComponent } from './trip-card.component';

@Component({
  selector: 'app-trips-list',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  template: `
    <div class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="m-0">Trips</h2>
        <a class="btn btn-success btn-sm" [routerLink]="['/trip','new']">Add Trip</a>
      </div>

      <div *ngIf="loading" class="alert alert-info py-2">Loading…</div>
      <div *ngIf="error" class="alert alert-danger py-2">{{error}}</div>

      <div class="row g-3">
        <div class="col-12 col-sm-6 col-lg-4" *ngFor="let t of trips">
          <app-trip-card [trip]="t"></app-trip-card>
        </div>
      </div>
    </div>
  `
})
export class TripsListComponent implements OnInit {
  trips: Trip[] = [];
  loading = false;
  error = '';

  constructor(private tripSvc: TripService) {}

  ngOnInit(): void {
    this.loading = true;
    this.tripSvc.getTrips().subscribe({
      next: (data) => { this.trips = data; this.loading = false; },
      error: (err) => { this.error = 'Failed to load trips'; this.loading = false; }
    });
  }
}
