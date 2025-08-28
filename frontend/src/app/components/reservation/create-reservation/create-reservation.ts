import { Component } from '@angular/core';
import { ReservationModel } from '../../../Models/ReservationModel';
import { ReservationService } from '../../../services/reservation/reservation-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './create-reservation.html',
  styleUrls: ['./create-reservation.css']
})
export class CreateReservation {
  newReservation: ReservationModel = {
    name: '',
    reservedDate: new Date()
  };

  // Helper properties for date handling
  minDate: string;
  maxDate: string;

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {
    // Initialize date limits
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    this.maxDate = nextYear.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (!this.newReservation.name?.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    this.createReservation();
  }

  createReservation(): void {
    this.reservationService.createReservation(this.newReservation).subscribe({
      next: (data) => {
        console.log('Reservation created successfully!', data);
        this.router.navigate(['/reservations']);
      },
      error: (err) => {
        console.error('Error creating reservation!', err);
        alert('Failed to create reservation. Please try again later.');
      }
    });
  }
}