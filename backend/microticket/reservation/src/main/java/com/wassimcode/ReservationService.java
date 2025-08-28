package com.wassimcode;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final RestTemplate restTemplate;

    @CircuitBreaker(name = "ticketServiceCB", fallbackMethod = "ticketServiceFallback")
    public ResponseEntity<Map<String, String>> createReservation(ReservationRequest reservationRequest) {
        Reservation reservation = Reservation.builder()
                .reservedDate(reservationRequest.reservedDate())
                .name(reservationRequest.name())
                .build();

        reservationRepository.saveAndFlush(reservation);

        TicketResponse ticketResponse = restTemplate.getForObject(
                "http://TICKET-SERVICE/api/v1/tickets/res/{reservationId}",
                TicketResponse.class,
                reservation.getId());

        if (!ticketResponse.isReserved()) {
            throw new IllegalStateException("Not reserved");
        }

        reservationRepository.save(reservation);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Reservation created successfully with ticket");
        response.put("status", "UP");

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Map<String, String>> ticketServiceFallback(ReservationRequest reservationRequest,
            Throwable t) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Ticket Service is currently unavailable. Please try again later.");
        response.put("status", "DOWN");
        return ResponseEntity.status(503).body(response);
    }

    public Reservation[] getAllReservations() {
        return reservationRepository.findAll().toArray(new Reservation[0]);
    }

    public Reservation getReservationById(Integer id) {
        System.out.println("Reservation with id: " + id + " has been requested");
        return reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Reservation not found with id: " + id));
    }
}
