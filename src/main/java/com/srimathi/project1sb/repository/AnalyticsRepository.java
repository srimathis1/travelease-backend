package com.srimathi.project1sb.repository;

import com.srimathi.project1sb.model.Booking;
import com.srimathi.project1sb.model.Feedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
public class AnalyticsRepository {

    @Autowired
    private BookingRepository
            bookingRepository;

    @Autowired
    private VehicleRepository
            vehicleRepository;

    @Autowired
    private FeedbackRepository
            feedbackRepository;

    // ==========================
    // TOTAL TRIPS
    // ==========================

    public long
    getTotalTrips() {

        return vehicleRepository
                .count();
    }

    // ==========================
    // TOTAL BOOKINGS
    // ==========================

    public long
    getTotalBookings() {

        return bookingRepository
                .count();
    }

    // ==========================
    // TOTAL FEEDBACKS
    // ==========================

    public long
    getTotalFeedbacks() {

        return feedbackRepository
                .count();
    }

    // ==========================
    // MOST BOOKED PLACE
    // ==========================

    public String
    getMostBookedPlace() {

        List<Booking>
                bookings =
                bookingRepository
                        .findAll();

        return bookings
                .stream()

                // ignore null destination
                .filter(

                        booking ->

                                booking
                                        .getDestination()
                                        != null
                )

                .collect(

                        Collectors.groupingBy(

                                Booking
                                        ::getDestination,

                                Collectors
                                        .counting()
                        )
                )

                .entrySet()

                .stream()

                .max(

                        Map.Entry
                                .comparingByValue()
                )

                .map(

                        Map.Entry
                                ::getKey
                )

                .orElse(
                        "No Data"
                );
    }

    // ==========================
    // TOP RATED PLACE
    // ==========================

    public String
    getTopRatedPlace() {

        List<Feedback>
                feedbacks =
                feedbackRepository
                        .findAll();

        return feedbacks
                .stream()

                // ignore null destination
                .filter(

                        feedback ->

                                feedback
                                        .getDestination()
                                        != null
                )

                .collect(

                        Collectors.groupingBy(

                                Feedback
                                        ::getDestination,

                                Collectors
                                        .averagingDouble(

                                                Feedback
                                                        ::getRating
                                        )
                        )
                )

                .entrySet()

                .stream()

                .max(

                        Map.Entry
                                .comparingByValue()
                )

                .map(

                        Map.Entry
                                ::getKey
                )

                .orElse(
                        "No Ratings"
                );
    }

    // ==========================
    // MONTHLY BOOKINGS
    // ==========================

    public Map<String, Long>
    getMonthlyBookings() {

        List<Booking>
                bookings =
                bookingRepository
                        .findAll();

        Map<String, Long>
                monthlyBookings =
                new LinkedHashMap<>();

        monthlyBookings.put(
                "Jan", 0L
        );

        monthlyBookings.put(
                "Feb", 0L
        );

        monthlyBookings.put(
                "Mar", 0L
        );

        monthlyBookings.put(
                "Apr", 0L
        );

        monthlyBookings.put(
                "May", 0L
        );

        monthlyBookings.put(
                "Jun", 0L
        );

        monthlyBookings.put(
                "Jul", 0L
        );

        monthlyBookings.put(
                "Aug", 0L
        );

        monthlyBookings.put(
                "Sep", 0L
        );

        monthlyBookings.put(
                "Oct", 0L
        );

        monthlyBookings.put(
                "Nov", 0L
        );

        monthlyBookings.put(
                "Dec", 0L
        );

        for (
                Booking booking
                : bookings
        ) {

            try {

                String
                        departureDate =
                        booking
                                .getDepartureDate();

                if (
                        departureDate
                                == null
                ) {

                    continue;
                }

                String month =
                        departureDate
                                .substring(
                                        5,
                                        7
                                );

                String
                        monthName =
                        switch (
                                month
                                ) {

                            case "01" ->
                                    "Jan";

                            case "02" ->
                                    "Feb";

                            case "03" ->
                                    "Mar";

                            case "04" ->
                                    "Apr";

                            case "05" ->
                                    "May";

                            case "06" ->
                                    "Jun";

                            case "07" ->
                                    "Jul";

                            case "08" ->
                                    "Aug";

                            case "09" ->
                                    "Sep";

                            case "10" ->
                                    "Oct";

                            case "11" ->
                                    "Nov";

                            default ->
                                    "Dec";
                        };

                monthlyBookings.put(

                        monthName,

                        monthlyBookings.get(
                                monthName
                        ) + 1
                );

            } catch (
                    Exception e
            ) {

                System.out.println(
                        "Invalid date format"
                );
            }
        }

        return monthlyBookings;
    }
}