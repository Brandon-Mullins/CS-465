import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService, Trip } from '../../services/trip.service';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trip-form.component.html'
})
export class TripFormComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tripsApi = inject(TripService);

  id: string | null = null;

  form = this.fb.group({
    title: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    nights: [1, [Validators.required, Validators.min(1)]],
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id && this.id !== 'new') {
      this.tripsApi.read(this.id).subscribe(trip => {
        this.form.patchValue({
          title: trip.title,
          price: trip.price,
          nights: trip.nights
        });
      });
    }
  }

  save() {
    const payload = this.form.value as Trip;
    if (this.id && this.id !== 'new') {
      this.tripsApi.update(this.id, payload).subscribe(() => this.router.navigate(['/trips']));
    } else {
      this.tripsApi.add(payload).subscribe(() => this.router.navigate(['/trips']));
    }
  }

  delete() {
    if (!this.id || this.id === 'new') return;
    this.tripsApi.remove(this.id).subscribe(() => this.router.navigate(['/trips']));
  }

  cancel() {
    this.router.navigate(['/trips']);
  }
}
