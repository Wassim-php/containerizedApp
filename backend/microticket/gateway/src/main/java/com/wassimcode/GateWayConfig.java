package com.wassimcode;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GateWayConfig {

    @Bean
    public RouteLocator customRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("ticket-service", r -> r.path("/api/v1/tickets/**")
                        .filters(f -> f.circuitBreaker(c -> c.setName("ticketServiceCircuitBreaker")
                                .setFallbackUri("forward:/ticketServiceFallback")))
                        .uri("lb://ticket-service"))
                .route("reservation-service", r -> r.path("/api/v1/reservation/**")
                        .filters(f -> f.circuitBreaker(c -> c.setName("reservationServiceCircuitBreaker")
                                .setFallbackUri("forward:/reservationServiceFallback")))
                        .uri("lb://reservation-service"))
                .build();
    }

}
