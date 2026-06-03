package com.srimathi.project1sb.service;

import com.srimathi.project1sb.repository.AnalyticsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AnalyticsService {

    @Autowired
    private AnalyticsRepository
            analyticsRepository;

    public Map<String, Object>
    getDashboardAnalytics() {

        Map<String, Object>
                analytics =
                new HashMap<>();

        analytics.put(

                "totalTrips",

                analyticsRepository
                        .getTotalTrips()
        );

        analytics.put(

                "totalBookings",

                analyticsRepository
                        .getTotalBookings()
        );

        analytics.put(

                "totalFeedbacks",

                analyticsRepository
                        .getTotalFeedbacks()
        );

        analytics.put(

                "mostBookedPlace",

                analyticsRepository
                        .getMostBookedPlace()
        );

        analytics.put(

                "topRatedPlace",

                analyticsRepository
                        .getTopRatedPlace()
        );

        analytics.put(

                "monthlyBookings",

                analyticsRepository
                        .getMonthlyBookings()
        );

        return analytics;
    }
}