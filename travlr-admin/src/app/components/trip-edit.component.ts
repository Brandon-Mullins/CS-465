import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TripService } from '../services/trip.service';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="container py-4" *ngIf="trip">
    <h2 class="mb-3">{{ isNew ? 'Add Trip' : 'Edit Trip' }}</h2>

    <form (ngSubmit)="save()" #tripForm="ngForm" class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Title</label>
        <input class="form-control" name="title" [(ngModel)]="trip.title" required>
      </div>

      <div class="col-md-3">
        <label class="form-label">Price</label>
        <input type="number" class="form-control" name="price" [(ngModel)]="trip.price" required>
      </div>

      <div class="col-md-3">
        <label class="form-label">Nights</label>
        <input type="number" class="form-control" name="nights" [(ngModel)]="trip.nights" required>
      </div>

      <div class="col-md-4">
        <label class="form-label">Start Date</label>
        <input type="date" class="form-control" name="startDate"
               [ngModel]="trip.startDate | date:'yyyy-MM-dd'"
               (ngModelChange)="trip.startDate = $event">
      </div>

      <div class="col-md-8">
        <label class="form-label">Image URL</label>
        <input class="form-control" name="image" [(ngModel)]="trip.image">
      </div>

      <div class="col-12 d-flex gap-2">
        <button class="btn btn-primary" [disabled]="tripForm.invalid">{{ isNew ? 'Add' : 'Save' }}</button>
        <button type="button" class="btn btn-outline-secondary" (click)="back()">Cancel</button>
        <button *ngIf="!isNew" type="button" class="btn btn-danger ms-auto" (click)="remove()">Delete</button>
      </div>
    </form>
  </div>

  <div class="container py-4" *ngIf="!trip">
    <div class="alert alert-info">Loading…</div>
  </div>
  `
})
export class TripEditComponent implements OnInit {
  trip: Trip | null = null;
  isNew = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripSvc: TripService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.isNew = true;
      this.trip = {
        title: '',
        price: 0,
        nights: 1,
        startDate: new Date().toISOString().slice(0,10),
        image: ''
      };
    } else if (id) {
      this.tripSvc.getTrip(id).subscribe(t => this.trip = t);
    }
  }

  save() {
    if (!this.trip) return;
    if (this.isNew) {
      this.tripSvc.addTrip(this.trip).subscribe(() => this.router.navigateByUrl('/'));
    } else {
      this.tripSvc.updateTrip(this.trip._id!, this.trip).subscribe(() => this.router.navigateByUrl('/'));
    }
  }

  remove() {
    if (!this.trip || !this.trip._id) return;
    if (confirm('Delete this trip?')) {
      this.tripSvc.deleteTrip(this.trip._id).subscribe(() => this.router.navigateByUrl('/'));
    }
  }

  back() {
    this.router.navigateByUrl('/');
  }
}
