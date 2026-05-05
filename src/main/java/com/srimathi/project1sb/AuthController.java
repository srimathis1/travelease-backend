package com.srimathi.project1sb.controller;

import com.srimathi.project1sb.model.User;
import com.srimathi.project1sb.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userRepository.findByUsername(user.getUsername())
                .filter(u -> u.getPassword().equals(user.getPassword()))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }

    // ✅ GET USERS (optional)
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}