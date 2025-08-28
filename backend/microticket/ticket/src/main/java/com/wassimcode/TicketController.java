package com.wassimcode;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/tickets")
@AllArgsConstructor
@Slf4j
public class TicketController {
    public final TicketService ticketService;

    @GetMapping("res/{reservationId}")
    public TicketResponse isReserved(@PathVariable("reservationId") Integer reservationId) {
        boolean isReserved = ticketService.isReservationReserved(reservationId);
        log.info("ticket request for reservation{}", reservationId);
        return new TicketResponse(isReserved);
    }

    @GetMapping("/all")
    public Ticket[] getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/{id}")
    public Ticket getTicketById(@PathVariable("id") Integer id) {
        log.info("ticket with id {} has been requested", id);
        return ticketService.getTicketById(id);
    }

}
