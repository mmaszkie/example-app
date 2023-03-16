package com.example.exampleapp;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginManager {

    @GetMapping("/test")
    boolean login() {
        return true;
    }

}
