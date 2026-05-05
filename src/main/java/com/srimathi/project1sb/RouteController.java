package com.srimathi.project1sb.controller;

import com.srimathi.project1sb.model.Route;
import com.srimathi.project1sb.service.RouteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/route")
@CrossOrigin(origins = "http://localhost:3000")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @GetMapping("/all")
    public List<Route> getAllRoutes() {
        return routeService.getAllRoutes();
    }

    @PostMapping("/add")
    public Route addRoute(@RequestBody Route route) {
        return routeService.addOrUpdateRoute(route);
    }

    @DeleteMapping("/{id}")
    public void deleteRoute(@PathVariable Long id) {
        routeService.deleteRoute(id);
    }
}