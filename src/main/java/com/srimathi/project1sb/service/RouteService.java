package com.srimathi.project1sb.service;

import com.srimathi.project1sb.model.Route;
import com.srimathi.project1sb.repository.RouteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RouteService {

    private final RouteRepository routeRepository;

    public RouteService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route addOrUpdateRoute(Route route) {

        // 🔥 Normalize input
        route.setSource(route.getSource().trim().toLowerCase());
        route.setDestination(route.getDestination().trim().toLowerCase());
        route.setTransportType(route.getTransportType().trim().toLowerCase());

        Optional<Route> existing = routeRepository.findExistingRoute(
                route.getSource(),
                route.getDestination(),
                route.getTransportType()
        );

        if (existing.isPresent()) {

            Route r = existing.get();

            // 🔥 UPDATE seats
            r.setAvailableSeats(r.getAvailableSeats() + route.getAvailableSeats());

            return routeRepository.save(r);

        } else {
            return routeRepository.save(route);
        }
    }

    public void deleteRoute(Long id) {
        routeRepository.deleteById(id);
    }
}