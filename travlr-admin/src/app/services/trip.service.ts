import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trip {
  _id?: string;
  title: string;
  price: number;
  nights: number;
  startDate?: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class TripService {
  private http = inject(HttpClient);
  private base = '/api/trips';

  list(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.base);
  }

  read(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.base}/${id}`);
  }

  add(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.base, trip);
  }

  update(id: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.base}/${id}`, trip);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}