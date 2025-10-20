import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="card h-100 shadow-sm">
    <img *ngIf="trip?.image" [src]="trip.image" class="card-img-top" alt="{{trip.title}}">
    <div class="card-body">
      <h5 class="card-title">{{ trip.title }}</h5>
      <p class="card-text mb-1">
        <strong>\${{ trip.price }}</strong> •
        {{ trip.nights }} nights
      </p>
      <p class="text-muted small mb-2">
        Starts: {{ trip.startDate | date:'yyyy-MM-dd' }}
      </p>
      <a class="btn btn-primary btn-sm" [routerLink]="['/trip', trip._id]">Edit</a>
    </div>
  </div>
  `
})
export class TripCardComponent {
  @Input() trip!: Trip;
}
