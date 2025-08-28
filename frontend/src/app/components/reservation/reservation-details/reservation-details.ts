import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation/reservation-service';
import { ReservationModel } from '../../../Models/ReservationModel';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservation-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './reservation-details.html',
  styleUrl: './reservation-details.css',
})
export class ReservationDetails implements OnInit {

  reservation!: ReservationModel;
  constructor(private reservationService: ReservationService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.reservationService.getReservationById(id).subscribe({
        next: (data) => {
          this.reservation = data;
        },
        error: (err) => {
        console.error('Error fetching reservation details', err);
        }
      })
    }
  }

  
}
