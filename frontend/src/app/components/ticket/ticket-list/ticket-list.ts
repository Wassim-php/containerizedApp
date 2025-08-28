import { Component, OnInit } from '@angular/core';
import { TicketModel } from '../../../Models/TicketModel';
import { TicketService } from '../../../services/ticket/ticket-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css'
})
export class TicketList implements OnInit{
    tickets: TicketModel[] = [];

    constructor(private ticketService: TicketService){}
    
    ngOnInit(): void {
        this.ticketService.getAllTickets().subscribe({
          next: (data) => {
            this.tickets = data;
          },
          error: (err) => {
            console.error('Error fetching tickets', err);
          }
        })
    }

}
