package com.wassimcode;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@RestController
@RequestMapping("api/v1/reservation")
@AllArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> reserve(@RequestBody ReservationRequest request) {
        log.info("new reservation has been created", request);
        return reservationService.createReservation(request);

    }

    @GetMapping("/all")
    public Reservation[] getAllReservations() {
        log.info("get all reservations");
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public Reservation getReservationById(@PathVariable("id") Integer id) {
        log.info("reservation with id {} has been requested", id);
        return reservationService.getReservationById(id);
    }

}
