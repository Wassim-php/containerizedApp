import { Component, OnInit } from '@angular/core';
import { ReservationModel } from '../../../Models/ReservationModel';
import { ReservationService } from '../../../services/reservation/reservation-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-reservation-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.css'
})
export class ReservationList implements OnInit{
    reservations: ReservationModel[] =[];

    constructor(private reservationService: ReservationService){}

    ngOnInit(): void {
        this.reservationService.getAllReservation().subscribe({
          next: (response) => {
            this.reservations = response;
          },
          error: (err) => {
            console.error('Error fetching reservations:', err);
          }
        })
    }



}
