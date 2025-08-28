package com.wassimcode;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;

    public boolean isReservationReserved(Integer reservationId) {
        ticketRepository.save(Ticket.builder().reservationId(reservationId).isReserved(true).build());

        return true;
    }

    public Ticket[] getAllTickets(){
        return ticketRepository.findAll().toArray(new Ticket[0]);
    }

    public Ticket getTicketById(Integer id){
        return ticketRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Ticket not found with id: " +id));
    }
}
