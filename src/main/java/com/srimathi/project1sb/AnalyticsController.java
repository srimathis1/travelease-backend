package com.srimathi.project1sb;

import com.srimathi.project1sb.service.AnalyticsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private AnalyticsService
            analyticsService;

    @GetMapping("/dashboard")
    public Map<String, Object>
    getDashboardAnalytics() {

        return analyticsService
                .getDashboardAnalytics();
    }
}