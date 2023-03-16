package com.example.exampleapp;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestEndpoint {

    @GetMapping("/test")
    boolean test(@RequestParam String assortmentCategory) {
        try {
            Thread.sleep(5);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

}
