package com.srimathi.project1sb.repository;

import com.srimathi.project1sb.model.Route;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RouteRepository extends JpaRepository<Route, Long> {

    @Query("SELECT r FROM Route r WHERE LOWER(r.source) = LOWER(:source) " +
            "AND LOWER(r.destination) = LOWER(:destination) " +
            "AND LOWER(r.transportType) = LOWER(:transportType)")
    Optional<Route> findExistingRoute(
            @Param("source") String source,
            @Param("destination") String destination,
            @Param("transportType") String transportType
    );
}