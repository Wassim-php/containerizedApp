import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket/ticket-service';
import { TicketModel } from '../../../Models/TicketModel';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReservationModel } from '../../../Models/ReservationModel';
import { ReservationService } from '../../../services/reservation/reservation-service';

@Component({
  selector: 'app-ticket-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './ticket-component.html',
  styleUrl: './ticket-component.css',
})
export class TicketComponent implements OnInit {
  ticket!: TicketModel;
  reservation!: ReservationModel;
  loading = true;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTicket(id);
  }

  loadTicket(id: number): void {
    this.ticketService.getTicketById(id).subscribe({
      next: (data) => {
        this.ticket = data;
        if (this.ticket.reservationId) {
          this.loadReservation(this.ticket.reservationId);
        } else {
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Error loading ticket', err);
        this.loading = false;
      },
    });
  }

  loadReservation(id: number): void {
    this.reservationService.getReservationById(id).subscribe({
      next: (data) => {
        this.reservation = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching reservation', err);
        this.loading = false;
      },
    });
  }
}
