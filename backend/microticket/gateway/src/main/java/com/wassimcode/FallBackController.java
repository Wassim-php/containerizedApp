package com.wassimcode;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class FallBackController {

    @GetMapping("/ticketServiceFallback")
    public ResponseEntity<Map<String, String>> ticketServiceFallback() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Ticket Service is currently unavailable. Please try again later.");
        response.put("status", "DOWN");
        return ResponseEntity.status(503).body(response);
    }

    @GetMapping("/reservationServiceFallback")
    public ResponseEntity<Map<String, String>> reservationServiceFallback() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Reservation Service is currently unavailable. Please try again later.");
        response.put("status", "DOWN");
        return ResponseEntity.status(503).body(response);
    }
}
